import {DynamicList} from "./myers/myers.js";

const list = new DynamicList(
    "dynamicList",
    (item) => {
        const elem = document.createElement("p");
        elem.textContent = item.name + ", " + item.amount;
        return elem;
    },
    (oldItem, newItem) => {
        return oldItem.name === newItem.name && oldItem.amount === newItem.amount;
    }
);

const firstList = [
    {name: "apple", amount: 10},
    {name: "banana", amount: 22},
    {name: "peach", amount: 300},
    {name: "pineapple", amount: 17}
];

const secondList = [
    {name: "apple", amount: 10},
    {name: "banana", amount: 25},
    {name: "peach", amount: 300},
    {name: "watermelon", amount: 18},
    {name: "pineapple", amount: 17}
];

document.getElementById("buttonShowFirstList").onclick = function() {
    list.show(firstList);
}

document.getElementById("buttonShowSecondList").onclick = function() {
    list.show(secondList);
}