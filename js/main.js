// change the vars on line 5, 15, 25, and 44.

// globals
let isLoggedIn = false;
let intendedEmail = "youremailhere@example.com";

// do immediately
addBunting();

// do when page has loaded
window.onload = function(){
  retreiveProfileId()
    .then(() => buildSnippet())
    .then(() => {
      buntingMeta.endpoint = `https://YOUR_SUBDOMAIN_HERE.1.bunting.com/api/conversions/v1/create?authtoken=${buntingMeta.apiAuthToken}&unique_order_code=${buntingMeta.orderCode}&${buntingMeta.uriSnippet}&ordered_products=${buntingMeta.xmlPayload}&delivery_cost=4.99&date_time=1513170776&outlet=website`;
      if (buntingMeta.anchor){
        buntingMeta.anchor.setAttribute("href", buntingMeta.endpoint);
        buntingMeta.anchor.innerText = buntingMeta.endpoint;
      }
    });
}

window.buntingMeta = {
  anchor: document.getElementById("craftedEndpoint"),
  apiAuthToken: "YOUR_API_KEY_HERE",
  endpoint: null,
  profileId: null,
  orderCode: Math.floor(Math.random() * 10000) + 10,
  uriSnippet: null,
  xmlPayload: encodeURIComponent(`<ordered_products><ordered_product><upc>ap1</upc><p>1337</p><q>1</q></ordered_product><ordered_product><upc>ap2</upc><p>3</p><q>2</q></ordered_product><ordered_product><upc>ap3</upc><p>31</p><q>1</q></ordered_product></ordered_products>`),
}


function addBunting(){
  if (typeof window.$_Bunting == "undefined"){
    window.$_Bunting = {
      d: {}
    };
    if (isLoggedIn){
      $_Bunting.d.ea = intendedEmail;
      $_Bunting.d.uac = intendedEmail;
    }
  }
  $_Bunting.src = ("https:" == document.location.protocol ? "https://" : "http://") + "YOUR_SUBDOMAIN_HERE.1.bunting.com/call.js?wmID=5";
  $_Bunting.s = document.createElement("script");
  $_Bunting.s.type = "text/javascript";
  $_Bunting.s.async = true;
  $_Bunting.s.defer = true;
  $_Bunting.s.charset = "UTF-8";
  $_Bunting.s.src = $_Bunting.src;
  document.getElementsByTagName("head")[0].appendChild($_Bunting.s)
}

function buildSnippet (){
  return new Promise((resolve, reject) => {
    if (!isLoggedIn){
      buntingMeta.uriSnippet = `profile_id=${buntingMeta.profileId}`;
    }
    else {
      buntingMeta.uriSnippet = `email_address=${intendedEmail}`;
    }
    resolve();
  });

}

function retreiveProfileId(){
  return new Promise((resolve, reject) => {
    buntingMeta.profileId = $_Bunting.profile_id;
    document.getElementById("buntingProfileId").innerHTML = buntingMeta.profileId;
    document.getElementById("isLoggedIn").innerHTML = (isLoggedIn ? intendedEmail : isLoggedIn);
    resolve();
  });
}

function buyHandler(){
  buntingMeta.anchor.click();
}
