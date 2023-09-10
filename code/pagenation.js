class Pagination {
  constructor({ el, options }) {
    this.container = document.querySelector(el)
    this.total = options.total
    this.pageSizeOptions = options?.pageSizeOptions || [10, 20, 50, 100]
    this.totalPage = 0
    this.pageSize = this.pageSizeOptions[0]
    this.initPageSize()
  }
  /**
   * 添加pageSize元素
   */
  initPageSize = () => {
    const p = document.createDocumentFragment()
    const pageDom = document.createElement("div")
    pageDom.setAttribute("id", 'page-container')
    p.appendChild(pageDom)
    const select = document.createElement("select")
    select.addEventListener('change', (e) => {
      this.pageSize = e.target.value
      this.getTotalPage()
    })
    this.pageSizeOptions.forEach((e) => {
      const option = document.createElement("option")
      option.setAttribute('value', e)
      option.innerText = e
      select.appendChild(option)
    })
    p.appendChild(select)
    this.container.appendChild(p)
    this.getTotalPage()
  }
  /**
   * 计算分页信息
   */
  getTotalPage = () => {
    const num = this.total / this.pageSize
    this.totalPage = num % 1 === 0 ? num : Math.floor(num)+1
    const pageContainer = this.container.querySelector("#page-container")
    pageContainer.innerHTML = ''
    const domFragment = document.createDocumentFragment()
    const ul = document.createElement("ul")
    ul.setAttribute('id', 'ul-dom')
    ul.addEventListener('click', (e) => { this.onPageClick(e) })
    for (let i = 0; i < this.totalPage; i++) {
      const li = document.createElement("li")
      li.innerText = i + 1
      ul.appendChild(li)
    }
    domFragment.appendChild(ul)
    // 至少有2页再显示分页
    if (this.totalPage > 1) {
      const prebtn = document.createElement("button")
      prebtn.innerText = "上一页"
      // 点击上一页
      prebtn.addEventListener("click", () => {
        if (this.currentPage > 1) {
          this.onPageChange(this.currentPage - 1)
        }
      })
      domFragment.insertBefore(prebtn,ul)
      const nextbtn = document.createElement("button")
      nextbtn.innerText = "下一页"
      // 点击下一页
      nextbtn.addEventListener("click", () => {
        if (this.currentPage < this.totalPage) {
          this.onPageChange(this.currentPage + 1)
        }
      })
      domFragment.appendChild(nextbtn)
      pageContainer.appendChild(domFragment)
      // 初始化默认选中第一页
      this.onPageChange(1)
    }
  }
  /**
   * 分页发生变化
   */
  onPageChange = (page) => {
    this.currentPage = page
    const liDomList = this.container.querySelectorAll('#ul-dom li')
    liDomList.forEach((e) => {
      e.removeAttribute('class', '')
    })
    liDomList[page - 1].setAttribute('class', 'active')
  }
  /**
   * 点击页码
   */
  onPageClick = (e) => {
    if (e.target.nodeName === 'LI') {
      this.onPageChange(Number(e.target.innerText))
    }
  }
}

