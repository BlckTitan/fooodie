//function to trigger page reload after 10 seconds
export default function reloadPageAfterTenSeconds() {
    setTimeout(() => {
        window.location.reload(); // Reloads the current page
    }, 4500); // 10 seconds = 10000 milliseconds
}
