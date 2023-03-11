const targetProductName = "Buyer Protection";

// custom click behavior - just log out the time when uesr click
function customClickEvt() {
    console.log(new Date().toLocaleString());
}

/* @discription: find the target product index of productList
 * @params:      targetProductName - the name of product you want to diable editing
 *               productList - product list nodes
 * @return:      targetItemIndex: -1 if not found
 */
function findIndexOfProduct(targetProductName, productList) {
    let targetItemIndex = -1;
    productList.forEach((item, index) => {
        let productDetail = item.querySelector('.cart-item__details').innerText;
        if(productDetail.includes(targetProductName)){
            targetItemIndex = index;
        }
    });
    return targetItemIndex;
}

/* @discription: disable quantity editing of a certain product
 * @params:      targetProductName - the name of product you want to diable editing
 */
function disableEdit(targetProductName) {
    // get the productList
    const cartItemsWrapper = document.querySelector('.cart-items');
    const cartItemsEl = cartItemsWrapper.querySelector('tbody');
    const productList = cartItemsEl.childNodes;
    let targetDom;

    let targetItemIndex = findIndexOfProduct(targetProductName, productList);
    if(targetItemIndex !== -1) {
        targetDom = productList[targetItemIndex];
    }else {
         console.log('Can not find the target product, please check the product name!');
    }
    
    // get all the edit elements
    const minusBtn = targetDom.querySelectorAll('button')[0];
    const plusBtn = targetDom.querySelectorAll('button')[1];
    const inputEl = targetDom.querySelector('input');
    const delBtn = targetDom.querySelector('a');
    
    // add disable style of each edit element
    const editEls = [minusBtn, plusBtn, inputEl, delBtn];
    for(el of editEls) {
        el.disabled = 'true';
        el.style.cursor = 'not-allowed';
    }
    
    // prevent click event that triggered from clid
    targetDom.addEventListener('click', (evt) => {
        evt.stopPropagation();
        evt.preventDefault(); // prevent <a> link
        customClickEvt();
    }, true); // useCapture
}

/* @discription: put a targt product at the end of productList
 * @params:      targetProductName - the target product name
 */
function adjustProductorder(targetProductName){
    // get the productList
    const cartItemsWrapper = document.querySelector('.cart-items');
    const cartItemsEl = cartItemsWrapper.querySelector('tbody');
    const productList = cartItemsEl.childNodes;
    
    // adjust the target item order in itemList
    let targetItemIndex = findIndexOfProduct(targetProductName, productList);
    if(targetItemIndex !== -1) {
        if(targetItemIndex === productList.length - 1) return; // already at the end
        let targetEl = productList[targetItemIndex];
        cartItemsEl.removeChild(targetEl);
        cartItemsEl.appendChild(targetEl);
    }else {
        console.log('Can not find the target product, please check the product name!');
    }
}

disableEdit(targetProductName);
adjustProductorder(targetProductName);
