window.onscroll=()=>{window.scrollY>500?scrollBtn.classList.remove("scroll-top--hide"):window.scrollY<500&&scrollBtn.classList.add("scroll-top--hide")};const scrollBtn=document.querySelector(".scroll-top");scrollBtn.onclick=()=>{scrollToElem("#top")};const nativeSmoothScrollTo=o=>{window.scroll({behavior:"smooth",left:0,top:o.getBoundingClientRect().top+window.pageYOffset})},smoothScrollTo=(o,l)=>{const t=document.scrollingElement||document.documentElement,e=t.scrollTop,c=o-e,s=+new Date,n=r=>{const i=+new Date-s;var m,d,a;t.scrollTop=parseInt((m=i,d=e,a=c,(m/=l/2)<1?a/2*m*m+d:-a/2*(--m*(m-2)-1)+d)),i<l?requestAnimationFrame(n):t.scrollTop=o};n()},supportsNativeSmoothScroll="scrollBehavior"in document.documentElement.style,scrollToElem=o=>{if(!o)return;const l=document.querySelector(o);l&&(supportsNativeSmoothScroll?nativeSmoothScrollTo(l):smoothScrollTo(l.offsetTop,600))};