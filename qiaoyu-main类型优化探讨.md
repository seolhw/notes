# qiaoyu-main类型优化探讨

## 前言

目前巧寓项目组的qiaoyu-main仓库，有大概4000多个any，过多的any最直接的影响的就是项目的维护成本增加，错综杂乱的类型还会使项目变得混乱。下面我们将主要分析qiaoyu-main的类型问题并探究解决方案。

## qiaoyu-main存在的类型问题

- 过多的any
  - 全仓库有4000个any，其中半年内新增的有2000个，

- 较多的类型断言
  - 66个as，其中半年内新增30个

- 过多的基础类型，比如 string/number
  - 1760个string，1073个number

## 探究解决方案

以下我们会先分析在那些场景下我们容易出现类型杂乱或者类型错误的情况，并探究解决方案

- 使用一些类库时，我们不清楚它的类型，就写any了，例如`antd`组件库

  ![image-20220316172557789](http://vscode.lihuiwang.net/img/image-20220316172557789.png)

  *解决方案*

  使用`vscode`查看对应的类型，并跳转进类型详情，引入到项目中
  ``` ts
  import { CheckboxChangeEvent } from 'antd/es/checkbox';
  
  const onChange = (e: CheckboxChangeEvent) => {
      updateRentCollection({
        payEnable: e.target.checked ? 0 : 1,
        id: initialState?.currentUser?.id,
      })
  };
  ```
  
- 外部的一些库没有ts类型的，所以只能用any，例如`WosSys`

  ![](http://vscode.lihuiwang.net/img/941647766875_.pic.jpg)

  

  *解决方案*

  自己在`typings.d.ts`，定义其类型，例如 `WosSys` 

  ``` ts
  declare interface WosSysOptions {
    appid: string;
    bucket: string;
    wosurl: string;
    getAppSign?: (callback: (string)=>void) => void
  }
  declare interface WosSysUploadOptions {
    op: "upload_slice_init",
    filesiez: File['size'],
    bucketName: WosSysOptions["bucket"],
    remotePath: string,
    ttl: number,
    insertOnly: number,
    optSliceSize: number,
    onUploadProgress: ()=>void,
    onUploadSuccess: (result: any) => void,
    onUploadError: ()=>void,
  }
  
  declare interface Window {
    ga: (
      command: 'send',
      hitType: 'event' | 'pageview',
      fieldsObject: GAFieldsObject | string,
    ) => void;
    reloadAuthorized: () => void;
    WosSys: new (options: WosSysOptions) => ({
      upload: (file: File,options: WosSysUploadOptions) => void
    })
  };
  ```

- 需要写太多的类型，很累

  *解决方案*

  - 使用泛型优化下类型，充分使用其类型推导功能，尽量自动推导类型，不需要太多的手写类型，例如：

      ``` ts
        const getRowByKey =<T extends {key: string},>(key:string, newData: T[] ) => {
          return (newData)?.filter((item) => item.key === key)[0]
        };
      
        // OR
        type FilterFunction = <T extends {key: string}>(key: string, newData?: T[])=>T|undefined
      
        const getRowByKey:FilterFunction =(key, newData ) => {
          return (newData)?.filter((item) => item.key === key)[0]
        };
      ```
  
  - 使用类型实体和类型描述符，来规范类型的定义

    ``` tsx
    // 例如，角色设置页面，角色设置页面有简单的增删改查，实体就是角色实体
    
    // 我们先定义角色实体类型
    export interface RoleItemType {
      ct: string;
      ctId: string;
      desc: string;
      et: string;
      etId: string;
      id: string;
      name: string;
      gcid: string;
      gotoPage: string;
      isDelete: number;
    }
    
    // 查询时传递参数的类型
    export interface SearchData {
      ov: {
        roleLikeName: string;
      };
    }
    
    // 删除时的参数的类型
    export interface RoleDelItemType {
      id: RoleItemType['id'];
      deleteWhy: string;
    }
    
    // 全局类型，src/typings.d.ts
    export interface ResData<T> {
      data: T,
      code: number | string,
      msg: string
    }
    
    // 然后是增删改查的API
    import { request } from 'umi';
    
    // 查询
    export async function getRoleList(data: SearchData) {
      return request<ResData<RoleItemType[]>>('/pms/v3/sys/role/get_list', {
        method: 'post',
        data,
      });
    }
    
    // 添加角色
    export async function roleSave(data: Partial<RoleItemType>) {
      return request<ResData<void>>('/pms/v3/sys/role/save', {
        method: 'post',
        data,
      });
    }
    
    
    // 编辑角色
    export async function roleUpdate(data: Partial<RoleItemType>) {
      return request<ResData<void>>('/pms/v3/sys/role/update', {
        method: 'post',
        data,
      });
    }
    
    // 删除角色数据
    export async function deleteRole(data: RoleDelItemType) {
      return request<ResData<void>>('/pms/v3/sys/role/delete_by_id', {
        method: 'post',
        data,
      });
    }
    
    // 最后调用这些API的函数
    // 编辑或创建角色实体
    const onSaveRole = (data: Partial<RoleItemType> ) => {
      const api = data.id ? roleApi.roleUpdate : roleApi.roleSave;
      api(data).then((res) => {
        if (res?.code === 200) {
          getRoleList();
        }
      });
    };
    // 查询
    const getRoleList = (keyWord?: SearchData["ov"]["roleLikeName"]) => {
      roleApi.getRoleList({ ov: { roleLikeName: keyWord } }).then((res) => {
        if (res?.code === 200) {
          setDataSource(res.data || []);
        }
      });
    };
    
    // 删除
    const onDeleteRole = ({ id, deleteWhy }: RoleDelItemType) => {
      roleApi.deleteRole({ id, deleteWhy }).then((res) => {
        if (res?.code === 200) {
          getRoleList();
        }
      });
    };
    
    ```
  
  - 使用`ahooks`库减少业务代码，代码简洁了，类型自然也就少了
  
    ![11647783015_.pic](http://vscode.lihuiwang.net/img/11647783015_.pic.jpg)
  
    使用ahooks更改后，类型变得更少了
  
    ![21647783245_.pic_thumb](http://vscode.lihuiwang.net/img/31647783580_.pic.jpg)
  
    ``` tsx
    // 使用ahooks的useRequest，使用useRequest后，减少了useState的使用，也因此少写了类型，dataSource的类型是API上定义的，会自动推断的
    
    const { run, data: dataSource } = useRequest(
      async (keyWord?: SearchData['ov']['roleLikeName']) => {
        const { data, code } = await roleApi.getRoleList({ ov: { roleLikeName: keyWord } });
        if (code === 200) return data || [];
        return [];
      },
    );
    
    ```
  
    

​		

  