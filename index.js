// Your code here
function createEmployeeRecord(person)
{
    const [name, lastName, job, pay] = person

    const employee = {firstName: name, familyName: lastName, title: job, payPerHour: pay, timeInEvents: [], timeOutEvents: []}
    
    return employee
}

function createEmployeeRecords(employees)
{
    const employeesArray = []
    employees.forEach(employee => employeesArray.push(createEmployeeRecord(employee)))
    return employeesArray
}

function createTimeInEvent(employee, dateTime)
{
    const [day, time] = dateTime.split(" ")

    employee.timeInEvents.push({type: "TimeIn", date: day, hour: parseInt(time)})

    return employee
}

function createTimeOutEvent(employee, dateTime)
{
    const [day, time] = dateTime.split(" ")

    employee.timeOutEvents.push({type: "TimeOut", date: day, hour: parseInt(time)})

    return employee
}

function hoursWorkedOnDate(employee, day)
{
    const clockIn = employee.timeInEvents.find(record => record.date === day)
    const clockOut = employee.timeOutEvents.find(record => record.date === day)

    return (clockOut.hour - clockIn.hour) / 100
}

function wagesEarnedOnDate(employee, day)
{
    return employee.payPerHour * hoursWorkedOnDate(employee, day)
}

function allWagesFor(employee)
{
    const wages = employee.timeInEvents.map(timeIn => wagesEarnedOnDate(employee, timeIn.date))

    const total = wages.reduce((wage, memo) => memo + wage)
 
    return total
}

function findEmployeeByFirstName(employees, name)
{
    return employees.find(employee => employee.firstName === name)
}

function calculatePayroll(employees)
{
    return employees.map(employee => allWagesFor(employee)).reduce((wage, memo) => memo + wage)
}