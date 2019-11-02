require('intersection-observer');


function init(){

    
    let deviceWidth = window.innerWidth;
    let thresholdNum;
    window.addEventListener('resize', () => {
        deviceWidth = window.innerWidth;
        if (deviceWidth <= 746){
            thresholdNum = 0.1;
            sidebarActive(thresholdNum);
        }
    })


    if(deviceWidth <= 746){
        thresholdNum = 0.1;
        sidebarActive(thresholdNum)
    }
    else{
        thresholdNum = 0.45
        sidebarActive(thresholdNum)
    }

 


    /***************************************************
     * Home page animations when scrolling into section
     * *************************************************/
    //Animation observer
    let animations = document.querySelectorAll('.anim');
    let observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {
           
            let panelCheck = entry.target.classList.contains('panel');

            if(entry.intersectionRatio > 0){

                if (panelCheck){
                    document.getElementById('anim-slow').classList.add('animActive');
                    document.getElementById('anim-med').classList.add('animMed');
                    document.getElementById('anim-fast').classList.add('animFast');
                }
                else{
                    entry.target.classList.add('animActive');
                    
                }

            }

           
        })

    })

    animations.forEach(animation => {
        observer.observe(animation)
    })

}

function sidebarActive(thresholdNum){

    
     //Sidebar 
     let sidebar = document.getElementById('sidebar');
     let sidebar_a;
     
     if(sidebar != undefined){
        sidebar_a = sidebar.querySelectorAll('a');
 
        //Change nav active styles when clicking on link
        for(let i = 0; i < sidebar_a.length; i++){
            sidebar_a[i].classList.add('scrolly');
 
             //add active class when sidebar link is clicked
            sidebar_a[i].addEventListener("click", () => {
                for(let j = 0; j < sidebar_a.length; j++){
                    sidebar_a[j].classList.remove("active");
                }
 
                 sidebar_a[i].classList.add('active');
                 sidebar_a[i].classList.add('active-locked')
                
            })
        }
     }  
 
 
      //Sidebar active observer
      let options = {
         root: null,
         threshold: thresholdNum,
         rootMargin: '0px 0px -200px 0px'
     }
 
     //Change nav active styles when scrolling into section
     let activeNav = document.querySelectorAll('.activeNav');
     let observerSide = new IntersectionObserver((entries) => {
 
         entries.forEach(entry => {
 
             let currentID = document.querySelectorAll(`a[href='#${entry.target.id}']`)[0];
             currentID.classList.add('inactive');
 
             if(entry.intersectionRatio > thresholdNum){
                
                 currentID.classList.remove('inactive');
 
                 let sidebarCheck = Array.from(sidebar_a).filter(item => {return item.classList.contains('active-locked')})
                 if(sidebarCheck.length == 0){
                     sidebar_a.forEach(item => {item.classList.remove('active')})
                     currentID.classList.add('active'); 
                 }
 
                 else if (currentID.classList.contains('active-locked')){
                     currentID.classList.remove('active-locked');
                 }
             }
          
         })
     }, options)
 
     activeNav.forEach(item => {
         observerSide.observe(item)
     })
 
}


document.addEventListener("DOMContentLoaded", function(){

    //play animations on page load
    window.setTimeout(() => {
        document.getElementsByTagName('body')[0].classList.remove('is-preload');
    }, 100)

    // Load screen transition
    window.setTimeout(() => {
                let check = document.getElementById('loaddiv')
                if(check){
                    check.classList.add('loaddiv-fade')
                    // document.getElementById('loader').classList.add('load-fade')
                }
                
    }, 800)
    
    init();
  });

 
 

