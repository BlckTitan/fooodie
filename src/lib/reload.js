
//function to trigger page reload after 4.5 seconds
export default function reloadPage() {
    if(window){
        setTimeout(() => {
            window.location.reload(); // Reloads the current page
        }, 4500); // 4.5 seconds = 4500 milliseconds
    }
}
