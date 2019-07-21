var store = {
    branches: ["Centro", "Caballito"],
   
    clerks: ["Ada", "Grace", "Hedy", "Sheryl"], 
  
    soldComputers: [
      { date: new Date(2019, 2, 12), clerksName: "Hedy", components: ["Monitor GPRS 3000", "HDD Toyiva"], branch: 'Centro'},
      { date: new Date(2019, 2, 24), clerksName: "Sheryl", components: ["Motherboard ASUS 1500", "HDD Wezter Dishital"], branch: 'Caballito'},
      { date: new Date(2019, 2, 01), clerksName: "Ada", components: ["Motherboard MZI", "RAM Quinston Fury"], branch: 'Centro'},
      { date: new Date(2019, 2, 11), clerksName: "Grace", components: ["Monitor ASC 543", "RAM Quinston"], branch: 'Caballito'},
      { date: new Date(2019, 2, 15), clerksName: "Ada", components: ["Motherboard ASUS 1200", "RAM Quinston Fury"], branch: 'Centro'},
      { date: new Date(2019, 2, 12), clerksName: "Hedy", components: ["Motherboard ASUS 1500", "HDD Toyiva"], branch: 'Caballito'},
      { date: new Date(2019, 2, 21), clerksName: "Grace", components: ["Motherboard MZI", "RAM Quinston"], branch: 'Centro'},
      { date: new Date(2019, 2, 08), clerksName: "Sheryl", components: ["Monitor ASC 543", "HDD Wezter Dishital"], branch: 'Centro'},
      { date: new Date(2019, 2, 16), clerksName: "Sheryl", components: ["Monitor GPRS 3000", "RAM Quinston Fury"], branch: 'Centro'},
      { date: new Date(2019, 2, 27), clerksName: "Hedy", components: ["Motherboard ASUS 1200", "HDD Toyiva"], branch: 'Caballito'},
      { date: new Date(2019, 2, 22), clerksName: "Grace", components: ["Monitor ASC 543", "HDD Wezter Dishital"], branch: 'Centro'},
      { date: new Date(2019, 2, 05), clerksName: "Ada", components: ["Motherboard ASUS 1500", "RAM Quinston"], branch: 'Centro'},
      { date: new Date(2019, 2, 01), clerksName: "Grace", components: ["Motherboard MZI", "HDD Wezter Dishital"], branch: 'Centro'},
      { date: new Date(2019, 2, 07), clerksName: "Sheryl", components: ["Monitor GPRS 3000", "RAM Quinston"], branch: 'Caballito'},
      { date: new Date(2019, 2, 14), clerksName: "Ada", components: ["Motherboard ASUS 1200", "HDD Toyiva"], branch: 'Centro'},
      { date: new Date(2019, 1, 4), clerksName: "Grace", components: ["Monitor GPRS 3000", "Motherboard ASUS 1500"], branch: 'Centro' },
      { date: new Date(2019, 0, 1), clerksName: "Ada", components: ["Monitor GPRS 3000", "Motherboard ASUS 1500"], branch: 'Centro'},
      { date: new Date(2019, 0, 2), clerksName: "Grace", components: ["Monitor ASC 543", "Motherboard MZI"], branch: 'Centro'},
      { date: new Date(2019, 0, 10), clerksName: "Ada", components: ["Monitor ASC 543", "Motherboard ASUS 1200"], branch: 'Centro'},
      { date: new Date(2019, 0, 12), clerksName: "Grace", components: ["Monitor GPRS 3000", "Motherboard ASUS 1200"], branch: 'Centro'}
    ],
  
    prices: [
      { component: "Monitor GPRS 3000", price: 200 },
      { component: "Motherboard ASUS 1500", price: 120 },
      { component: "Monitor ASC 543", price: 250 },
      { component: "Motherboard ASUS 1200", price: 100 },
      { component: "Motherboard MZI", price: 30 },
      { component: "HDD Toyiva", price: 90 },
      { component: "HDD Wezter Dishital", price: 75 },
      { component: "RAM Quinston", price: 110 },
      { component: "RAM Quinston Fury", price: 230 }
    ]
}

let componentsArray = store.prices.map(e=>e.component)
let monthsInLetters = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
let monthsInCapitalLetters = monthsInLetters.map(e =>{
  return e.charAt(0).toUpperCase() + e.slice(1)
})
let monthsInNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
let newComponentsArray = []

const onloadIndex = () =>{
    showOnScreen('bestSellingClerk', maxSalesClerk())
    createTable('salesPerMonth', monthsInCapitalLetters, salesPerMonth())
    let salesPerBranch = store.branches.map(branch =>{return `$${totalSalesPerBranch(branch)}`})
    showOnScreen('bestSellingProduct', maxSalesProduct())
    createTable('salesPerBranch', store.branches, salesPerBranch)
    newSale()
}

const onloadSales = () =>{
    createSoldComputersTable('soldComputersTable')
}

const onloadComponents = () =>{
    let quantityPerComponent = componentsArray.map(component => quantitySoldPerComponent(component))
    createTable('componentsTable', componentsArray, quantityPerComponent)
}

const onloadClerks = () =>{
    let salesPerClerk = store.clerks.map(clerk =>{return `$${totalSalesPerClerk(clerk)}`})
    createTable('salesPerClerkTable', store.clerks, salesPerClerk)
    let clerkOfMonth = monthsInNumbers.map(month=>{return bestClerkOfMonth(month, 2019)})
    createTable('clerkOfMonthTable', monthsInCapitalLetters, clerkOfMonth)
}

const onloadBranch = () =>{
    let salesPerBranch = store.branches.map(branch =>{return `$${totalSalesPerBranch(branch)}`})
    createTable('salesPerBranchTable', store.branches, salesPerBranch)
    let branchOfMonth = monthsInNumbers.map(month =>{return bestBranchOfMonth(month, 2019)})
    createTable('branchOfMonthTable', monthsInCapitalLetters, branchOfMonth)
}

//from an array of components returns the total price of the computer
const computerPrice = componentsArray =>{
    let price = 0
    componentsArray.forEach( component =>{
        store.prices.forEach( e =>{
            e.component === component ? price += e.price : price
        })
    })
    return price
}

//receives a component and returns how many times it was sold
const quantitySoldPerComponent = component =>{
    let quantity = 0
    store.soldComputers.forEach( computer=>{
        computer.components.forEach( item =>{
            item === component ? quantity++ : quantity
        })
    })
    return quantity
}

//creates a table with the container's id and the data of each column in the form of arrays
//if the arrays are not the same length, the table will be the length of the smaller array
const createTable = (containerId, firstColumn, secondColumn) =>{
    let container = document.getElementById(containerId)
    container.innerHTML = ""
    firstColumn.forEach( (e, index) =>{
        //if any of the columns has undefined values, they're not shown on screen
        if (e !== undefined && e!== 0 && secondColumn[index] !== undefined && secondColumn[index] !== 0){
            let row = document.createElement('tr')
            let slot = document.createElement('td')
            slot.innerText = e
            row.appendChild(slot)
            let secondSlot = document.createElement('td')
            secondSlot.innerText = secondColumn[index]
            row.appendChild(secondSlot)
            container.appendChild(row)
        }
    })
}

//create a table with all the information from soldComputers
const createSoldComputersTable = containerId => {
    let container = document.getElementById(containerId)
    container.innerHTML = ''
    store.soldComputers.forEach(computer => {
        let row = document.createElement('tr')
        Object.keys(computer).forEach( key => {
            let slot = document.createElement('td')
            switch (key){
                case 'date':
                    slot.innerText = `${computer[key].getDate()}/${computer[key].getMonth() + 1}/${computer[key].getFullYear()}`
                    break;
                case 'components':
                    let ul = document.createElement('ul')
                    computer[key].forEach(component => {
                        let li = document.createElement('li')
                        li.innerText = component
                        ul.appendChild(li)
                    })
                    slot.appendChild(ul)
                    break;
                default:
                    slot.innerText = computer[key]
                    break;
            }
        row.appendChild(slot)
      })
      console.log(computer['components'])
      //adds a column that is not part of the original array
      newTableColumn(row, `$${computerPrice(computer['components'])}`)
      container.appendChild(row)
    })
}

const newTableColumn = (container, text) => {
    let slot = document.createElement('td')
    slot.innerText = text
    container.appendChild(slot)
}

//prints on screen inside a <p> tag
const showOnScreen = (containerId, data) =>{
    let father = document.getElementById(containerId)
    let child = document.createElement('p')
    child.innerText = data
    father.appendChild(child)
  }

//returns the best selling clerk of a specific month
const bestClerkOfMonth = (month, year) =>{
    let salesPerMonth = store.soldComputers.filter(e=>{
        if(e.date.getMonth() === month && e.date.getFullYear() === year) return e
    })
    let salesPerClerk = store.clerks.map(clerk=>{
        let counter = 0
        salesPerMonth.forEach(({clerksName, components})=>{
            clerksName === clerk ? counter += computerPrice(components) : counter
        })
        return counter
    })
    //it only returns a string if there were sales in the month. Otherwise, the value is undefined
    if(salesPerMonth.length){
        return bestClerk = store.clerks[salesPerClerk.indexOf(Math.max(...salesPerClerk))]
    }
}

//returns the total sales of a clerk without time limit
const totalSalesPerClerk = clerk =>{
    let sales = store.soldComputers.filter(e => {
        if(e.clerksName === clerk) return e
    })
    return total = sales.map(e=>computerPrice(e.components)).reduce((a,b)=>a+b)
}

//receives an array of objects and returns the sum of all computer components
const totalSales = objectArray =>{
    return total = objectArray.map(e=>computerPrice(e.components)).reduce((a,b)=>a+b)
}

//receives and branch and returns the total sales of that branch
const totalSalesPerBranch = branch =>{
    let sales = store.soldComputers.filter(e=>{
        if(e.branch === branch) return e
    })
    return totalSales(sales)
}

const bestBranchOfMonth = (month, year) =>{
    let salesPerMonth = store.soldComputers.filter(e=>{
        if(e.date.getMonth() === month && e.date.getFullYear() === year) return e
    })
    let salesPerBranch = store.branches.map(e=>{
        counter = 0
        salesPerMonth.forEach(sale=>{
            sale.branch === e ? counter += computerPrice(sale.components) : counter
        })
        return counter
    })
    if(salesPerMonth.length){
        return bestBranch = store.branches[salesPerBranch.indexOf(Math.max(...salesPerBranch))]
    }
}

//returns the total sales per month as an array
const salesPerMonth = () =>{
    let totalSalesPerMonth = monthsInNumbers.map(month=>{
        let sales = 0
        store.soldComputers.forEach(computer =>{
            computer.date.getMonth() === month ? sales += computerPrice(computer.components) : sales
        })
        if(sales) return `$${sales}`
    })
    return totalSalesPerMonth
}

//returns the best-selling product
const maxSalesProduct = () =>{
    let totalSales = 0
    let maxSales = 0
    let maxComponent = ''
    store.prices.forEach(e=>{
      totalSales = quantitySoldPerComponent(e.component)
      if(totalSales>maxSales){
        maxSales = totalSales
        maxComponent = e.component
      }
    })
    return maxComponent
}

//returns the clerk that sold more in terms of money
const maxSalesClerk = () =>{
    let totalSold = 0
    let maxTotalSold = 0
    let maxClerk = ''
    store.clerks.forEach(employee =>{
      totalSold = 0
      store.soldComputers.forEach(e=>{
        e.clerksName === employee ? totalSold += computerPrice(e.components) : totalSold
      })
      if(totalSold > maxTotalSold){
        maxTotalSold = totalSold
        maxClerk = employee
      }
    })
    return maxClerk
  }

//NEW SALE
const newSale = () =>{
    //newComponentsArray is the array that stores the components of the new sale
    newComponentsArray = []
    let showNewComponent = document.getElementById('showNewComponent')
    showNewComponent.innerHTML = ''
    setSelect('newClerk', 'una vendedora', store.clerks)
    setSelect('newBranch', 'una sucursal', store.branches)
    setSelect('newComponent', 'un componente', componentsArray)
}

//creates a select
const setSelect = (idSelect, type, array) =>{
    let select = document.getElementById(idSelect)
    select.innerHTML = ''
    let firstOption = document.createElement('option')
    firstOption.innerText = `Elija ${type}`
    select.appendChild(firstOption)
    array.forEach(e=>{
      let componentsOption = document.createElement('option')
      componentsOption.innerText = e
      select.appendChild(componentsOption)
    })
  }

//adds a component to newComponentsArray
const addComponentToList = () =>{
    let newComponent = document.getElementById('newComponent')
    newComponentsArray.push(newComponent.value)
    createComponentsList(newComponent.value, newComponentsArray.length-1)
    
    /*let chosenComponentError = document.getElementById('chosenComponentError')
    chosenComponentError.innerHTML = ''
    let sellerOrBranchError = document.getElementById('sellerOrBranchError')
    sellerOrBranchError.innerHTML = ''
    let newComponent = document.getElementById('newComponent')
    if(newComponent.value === 'Elija un componente'){
        showOnScreen('chosenComponentError', 'Elija un componente válido')
    }else{
        newComponentsArray.push(newComponent.value)
        createComponentsList(newComponent.value, newComponentsArray.length-1)
    }*/
}

const createComponentsList = (text, btnId) =>{
    let componentUl = document.getElementById('showNewComponent')
    let componentLi = document.createElement('li')
    componentLi.innerText = text
    let deleteBtn = document.createElement('img')
    deleteBtn.src = 'images/Icon-Delete.png'
    deleteBtn.id = btnId
    deleteBtn.onclick = function(){ deleteItem(this) }
    componentLi.appendChild(deleteBtn)
    componentUl.appendChild(componentLi)
}

const deleteItem = btn => {
    newComponentsArray.splice(btn.id, 1)
    let componentUl = document.getElementById('showNewComponent')
    componentUl.innerHTML = ''
    newComponentsArray.forEach((e, index)=>{
        createComponentsList(e, index)
    })
}
