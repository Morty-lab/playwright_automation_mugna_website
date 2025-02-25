const estimateProjectCost = (team, months) => {
    let totalSalary = 0;
    
    for (const role in team) {
        totalSalary += (team[role].hoursPerWeek * 4) * team[role].quantity * team[role].hourlyRate;
    }
    
    return totalSalary * months;
};

module.exports = estimateProjectCost;

