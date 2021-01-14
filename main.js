// Variables Initiate
let json_data;
let dow;
let days = ['mon', 'tue', 'wed', 'thu']
let arr;

// Methods
function focus(id) {
    // Get the available button ids
    let non_focus = ['mon', 'tue', 'wed', 'thu']

    // Remove the button id that need to be focused
    non_focus.splice(non_focus.indexOf(id), 1)

    // Change the class elements in the focused button
    document.getElementById(id).classList.remove('btn-secondary')
    document.getElementById(id).classList.add('btn-primary')

    // For the non-focus button, if the button is focused, revert it back to non-focus
    for(i = 0 ; i < non_focus.length ; i++)
    {
        if (document.getElementById(non_focus[i]).classList.contains('btn-primary'))
        {
            document.getElementById(non_focus[i]).classList.remove('btn-primary')
            document.getElementById(non_focus[i]).classList.add('btn-secondary')
        }
    }
}

function getCurrentDay()
{
    // Get current date
    let date = new Date()

    // Get day of week
    let dow_i = date.getDay()

    switch(dow_i)
    {
        case 0:
            return "sun"
        case 1:
            return "mon"
        case 2:
            return "tue"
        case 3:
            return "wed"
        case 4:
            return "thu"
        case 5:
            return "fri"
        case 6:
            return "sat"
    }
}

function resetTable(table)
{
    while(table.firstChild)
    {
        table.removeChild(table.firstChild);
    }
}

function addHeader(table)
{
    let header = table.createTHead()
    let row = header.insertRow(0)
    for (i=0; i<7; i++)
    {
        let cell = row.insertCell(i)
        switch(i)
        {
            case 0:
                cell.innerHTML = "Code"
                break
            case 1:
                cell.innerHTML = "Name"
                break
            case 2:
                cell.innerHTML = "Section"
                break
            case 3:
                cell.innerHTML = "Credits"
                break
            case 4:
                cell.innerHTML = "Time Start"
                break
            case 5:
                cell.innerHTML = "Time End"
                break
            case 6:
                cell.innerHTML = "Type"
                break
        }
    }
}

function searchClass()
{
    let arr = []
    let dow_i = days.indexOf(dow)
    for(course_index=0; course_index<json_data.length; course_index++)
    {
        for(schedule_index=0; schedule_index<json_data[course_index].schedules.length; schedule_index++)
        {
            if(json_data[course_index].schedules[schedule_index].day === dow_i)
            {
                arr.push({
                    "code": json_data[course_index].code,
                    "name": json_data[course_index].name,
                    "section": json_data[course_index].section,
                    "credits": json_data[course_index].credits,
                    "timeStart": json_data[course_index].schedules[schedule_index].timeStart,
                    "timeEnd": json_data[course_index].schedules[schedule_index].timeEnd,
                    "type": json_data[course_index].schedules[schedule_index].type === 0 ? "Lectures" : "Lab"
                })
            }
        }
    }
    return arr
}

function addBody(table)
{
    // Get associate classes
    arr = searchClass()
    arr.sort((a,b) => {
        let keyA = Number(a.timeStart)
        let keyB = Number(b.timeStart)
        if (keyA < keyB) return -1
        if (keyA > keyB) return 1
        return 0
    })

    // Create <tbody>
    let body = table.createTBody()

    // For every result in arr, organize the data
    for(i=0; i<arr.length; i++)
    {
        let row = body.insertRow(i)
        for(j=0;j<7;j++)
        {
            let cell = row.insertCell(j)
            switch(j)
            {
                case 0:
                    cell.innerHTML = arr[i].code
                    break
                case 1:
                    cell.innerHTML = arr[i].name
                    break
                case 2:
                    cell.innerHTML = arr[i].section
                    break
                case 3:
                    cell.innerHTML = arr[i].credits
                    break
                case 4:
                    cell.innerHTML = arr[i].timeStart
                    break
                case 5:
                    cell.innerHTML = arr[i].timeEnd
                    break
                case 6:
                    cell.innerHTML = arr[i].type
                    break
            }
        }
    }
}

function displayTable()
{
    // Get table
    let table = document.getElementById('content')

    // Reset the content from the table
    resetTable(table)

    // Organize and insert <thead>
    addHeader(table)

    // Organize and insert <tbody>
    addBody(table)
}

function startTime()
{
    let today = new Date()
    let h = today.getHours()
    let m = today.getMinutes()
    let s = today.getSeconds()
    h = checkTime(h)
    m = checkTime(m)
    s = checkTime(s)
    document.getElementById('thyme').innerHTML = h + ":" + m + ":" + s
    let t = setTimeout(startTime, 500)
}

function checkTime(i) {
    if (i < 10) {i = "0" + i}  // add zero in front of numbers < 10
    return i
}

// Fetch API
fetch('https://raw.githubusercontent.com/ClaushWong/notes/master/schedule.json')
    .then((res) => res.json())
    .then((json) => json_data = json.courses)
    .then(() => {
        dow = getCurrentDay()
        focus(dow)
        displayTable()
    })

// Event Listeners
document.querySelector("#mon").addEventListener('click', () => {
    // Focus on the button
    focus('mon')
    // Set days to 0
    dow = "mon"
    // Display table
    displayTable()
})

document.querySelector("#tue").addEventListener('click', () => {
    focus('tue')
    dow = "tue"
    displayTable()
})

document.querySelector("#wed").addEventListener('click', () => {
    focus('wed')
    dow = "wed"
    displayTable()
})

document.querySelector("#thu").addEventListener('click', () => {
    focus('thu')
    dow = "thu"
    displayTable()
})