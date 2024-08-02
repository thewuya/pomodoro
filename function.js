var timer = null;
var clock = document.getElementById("time");
function pomodoro()
{
    set_time(25, 0);
}

function short()
{
    set_time(0, 2);
}

function long()
{
    set_time(15, 0);
}

function set_time(min, sec)
{
    clearInterval(timer);
    clock.innerHTML = format_time(sec, min);
}
function start(min, sec)
{
    clearInterval(timer);
    
    let time = clock.innerHTML.split(":");
    min = parseInt(time[0]);
    sec = parseInt(time[1]);
    
    timer = setInterval( () => {
        if (min <= 0 && sec <= 0)
        {
            clearInterval(timer);
            display_notification();
            return;
        }

        if (sec <= 0)
        {
            min--;
            sec = 60;
        }
        sec--;
        clock.innerHTML = format_time(sec, min);
    }, 1000);
}

function pause()
{
    clearInterval(timer);
}

function format_time(sec, min)
{
    return `${String(min).padStart(2, '0')}: ${String(sec).padStart(2, '0')}`
}

function permission() {
    
    Notification.requestPermission().then(result => {
        console.log(`Notification permission: ${result}`);
        });

}

function display_notification() {
    if (Notification.permission === "granted") {
        const text = '时间到了';
        const notification = new Notification("待办列表", { body: text });
    } else {
        console.log("Notification permission not granted.");
    }
}