// Your code here
const createEmployeeRecord = (array) => {
    const answer = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return answer
}

const createEmployeeRecords = (arrayOfArrays) => {
    const arr = []
    arrayOfArrays.forEach(array => {
        arr.push(createEmployeeRecord(array))
    });
    return arr
}

const createTimeInEvent = (employeeRecord, datestamp) => {
    const date = datestamp.slice(0, 10)
    const hour = Number(datestamp.slice(11,15))
    const timeIn = {}
    timeIn.type = "TimeIn"
    timeIn.date = date
    timeIn.hour = hour
    employeeRecord.timeInEvents.push(timeIn)
    return employeeRecord
}

const createTimeOutEvent = (employeeRecord, datestamp) => {
    const date = datestamp.slice(0, 10)
    const hour = Number(datestamp.slice(11,15))
    const timeOut = {}
    timeOut.type = "TimeOut"
    timeOut.date = date
    timeOut.hour = hour
    employeeRecord.timeOutEvents.push(timeOut)
    return employeeRecord
}

const hoursWorkedOnDate = (employeeRecord, date) => {
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date)
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date)
    const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100
    return hoursWorked
}

const wagesEarnedOnDate = (employeeRecord, date) => {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date)
    const pay = hoursWorked * employeeRecord.payPerHour
    return pay
}

const allWagesFor = (employeeRecord) => {
    const datesWorked = []
    let allWages = 0
    employeeRecord.timeInEvents.forEach(event => {
        datesWorked.push(event.date)
    });
    datesWorked.forEach(date => {
        allWages = allWages + wagesEarnedOnDate(employeeRecord, date)
    })
    return allWages
}

const findEmployeeByFirstName = (employeeRecords, firstName) => {
    const employee = employeeRecords.find(record => record.firstName === firstName)
    return employee
}

const calculatePayroll = (employeeRecords) => {
    const employeePay = employeeRecords.map(employee => allWagesFor(employee))
    const sumOfAllCompanyWages = employeePay.reduce( (acc, i) => {
        return acc + i
    })
    return sumOfAllCompanyWages
}