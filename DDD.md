# DDD学习资料

## 第一章

```java
@Transactional
public void saveCustomer(
    String customerId,
    String customerFirstName,
    String customerLastName,
    String streetAddress1,
    String streetAddress2,
    String city,
    String stateOrProvince,
    String postalCode,
    String country,
    String homePhone,
    String mobilePhone,
    String primaryEmailAddress,
    String secondaryEmailAddress,
) {
    Customer customer = customerDao.readCustomer(customerId)
    if(customer == null){
        customer = new Customer()
        customer.setCustomerId(customerId)
    }
    customer.setCustomerFirstName(customerFirstName)
    customer.setCustomerLastName(customerLastName)
    customer.setStreetAddress1(streetAddress1)
    customer.setStreetAddress2(streetAddress2)
    customer.setCity(city)
    customer.setStateOrProvince(stateOrProvince)
    customer.setPostalCode(postalCode)
    customer.setCountry(country)
    customer.setHomePhone(homePhone)
    customer.setMobilePhone(mobilePhone)
    customer.setPrimaryEmailAddress(primaryEmailAddress)
    customer.setSecondaryEmailAddress(secondaryEmailAddress)

    customerDao.saveCustomer(customer)
}
```

### 如何掌握通用语言

- 同时绘制物理模型图和概念模型图，并标注名字和行为。虽然这些图并不是正式的设计图，但他们却包含了软件建模的某些方面。即使你的团队在使用统一建模语言来完成正式建模，也不要得意忘形，因为这样可能反而不利于团队的讨论，最终将阻碍通用语言的诞生。
- 创建一个包含简单定义的术语表。将你能想到的术语都罗列起来，包含好的和不好的，并注明好与不好的原因，在你给术语下定义时，你在不经意间就会创建一些可重用的词汇，因为此时你使用的是领域通用语言。
- 如果你不喜欢术语表，可以采用其他类型的文档，但记得将那些“不正式”的模型图包含进去，同样，这里最终的目的也是发现通用语言的术语和词组。
- 由于团队中有些人工作在术语表中，还有些人工作在文档中，此时你需要找到团队的其他人员来检查你的成果，分歧肯定是有的，你应该对此有所准备。

修改上述的Customer类

```java
public interface Customer{
    // 修改顾客姓名
    public void changePersonalName(
        String firstName,
        String lastName
    )
    // 通信地址
    public void postalAddress(
        PostalAddress postalAddress
    )
    // 迁移到新地址
    public void relocateTo(
        PostalAddress changedPostalAddress
    )
    // 修改固定电话
    public void changeHomeTelephone(
        Telephone telephone
    )
    // 清空固定电话
    public void disconnectHomeTelephone()
    // 修改手机号
    public void changeMobileTelephone(
        Telephone telephone
    )
    // 清空手机号
    public void disconnectMobileTelephone()
    // 主要的Email地址
    public void primaryEmailAddress(
        EmailAddress emailAddress
    )
    // 次要的Email地址
    public void secondaryEmailAddress(
        EmailAddress emailAddress
    )
}

@Transactional
public void changeCustomerPersonalName(
    String customerId,
    String customerFirstName,
    string customerLastName,
) {
    Customer customer = customerPepository.customerOfId(customerId)
    if(customer == null){
        throw new IllegalStateException("Customer does not exist.")
    }
    customer.changePersonalName(customerFirstName, customerLastName)
}


```

### DDD的业务价值

- 你获得了一个非常拥有的领域模型
- 你的业务得到了更准确的定义和理解
- 领域专家可以为软件设计做出贡献
- 更好的用户体验
- 清晰的模型边界
- 更好的企业架构
- 敏捷、迭代式和持续建模
- 使用战略和战术新工具


