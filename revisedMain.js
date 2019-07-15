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

const onloadComponents = () =>{
    let quantityPerComponent = componentsArray.map(component => quantitySoldPerComponent(component))
    createTable('componentsTable', componentsArray, quantityPerComponent)
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
        if (e !== '' && secondColumn[index] !== ''){
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