const projects = [
    {
        description: "Basic team for 3 months",
        team: {
            frontEnd: { hoursPerWeek: 40, quantity: 2, hourlyRate: 22, tech: ["NextJS", "React"] },
            backEnd: { hoursPerWeek: 40, quantity: 2, hourlyRate: 22, tech: ["Python", "Django"] },
            // mobileDev: { hoursPerWeek: 40, quantity: 2, hourlyRate: 25, tech: ["React Native", "Expo"] },
            // designer: { hoursPerWeek: 40, quantity: 2, hourlyRate: 20, tech: ["Figma"] },
            pm: { hoursPerWeek: 20, quantity: 2, hourlyRate: 25, tech: ["GitHub"] },
            qa: { hoursPerWeek: 20, quantity: 2, hourlyRate: 20, tech: [] },
            // devOps: { hoursPerWeek: 10, quantity: 2, hourlyRate: 25, tech: ["Docker", "Kubernetes"] }
        },
        months: 3,
        expected: 42240
    }
]

export default projects;