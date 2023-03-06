const carouselImages = [
    {id: 1, imgLink: 'https://images.unsplash.com/photo-1558030089-02acba3c214e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1631&q=80'},
    {id: 2, imgLink: 'https://images.unsplash.com/photo-1558030137-a56c1b004fa3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1631&q=80'},
    {id: 3, imgLink: 'https://images.unsplash.com/photo-1558030006-450675393462?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1631&q=80'},
    {id: 4, imgLink: 'https://images.unsplash.com/photo-1558030089-02acba3c214e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1631&q=80'},
]
const carouselTimer = () =>{
    let counter = 1
    
    setInterval(()=>{

        if(counter >= carouselImages.length || counter < 1){
            counter = 1;
        }else{
            counter++
            carousel(counter)
        }
        
    }, 6000);
}
const carousel = (currentImg = 1) =>{

    const carouselDisplay = document.querySelector('section.grills');

    carouselImages.map(img => (
        img.id == currentImg ?
        carouselDisplay.style.backgroundImage = `url(${img.imgLink})`
        : false
    ))

}
carouselTimer()
carousel()

const run_scroll = () =>{

    let scroll_progress = document.querySelector('.backToTop');
    let scroll_progress_value = document.querySelector('.backToTop_value');

    let scroll_position = document.documentElement.scrollTop;

    let scroll_height = 
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

    let scroll_height_percent = Math.round((scroll_position * 100)/scroll_height)

    if (scroll_position > 100){
        scroll_progress.style.display = 'grid';
    }else{
        scroll_progress.style.display = 'none';
    }
    
    scroll_progress.addEventListener('click', () => {
        document.documentElement.scrollTop = 0
    })
    scroll_progress.style.background = `conic-gradient(#6A3329 ${scroll_height_percent}%,
        #d7d7d7 ${scroll_height_percent}%)`;
}
window.onscroll = run_scroll;
window.onload = run_scroll;