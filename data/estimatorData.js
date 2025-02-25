const projects = [
    {
        description: "Basic team for 3 months",
        team: {
            frontEnd: { hoursPerWeek: 40, quantity: 2, hourlyRate: 22 },
            backEnd: { hoursPerWeek: 40, quantity: 2, hourlyRate: 22 },
            // mobileDev: { hoursPerWeek: 40, quantity: 2, hourlyRate: 25 },
            // designer: { hoursPerWeek: 40, quantity: 2, hourlyRate: 20 },
            pm: { hoursPerWeek: 20, quantity: 2, hourlyRate: 25 },
            qa: { hoursPerWeek: 20, quantity: 2, hourlyRate: 20 },
            // devOps: { hoursPerWeek: 10, quantity: 2, hourlyRate: 25 }
        },
        months: 3,
        expected: 42240
    }
]

export default projects;