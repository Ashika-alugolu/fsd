export const students = [
  { id: 1, name: "Alice Johnson", email: "student@gmail.com", password: "password" },
  { id: 2, name: "Bob Smith", email: "bob@gmail.com", password: "password" }
];

export const events = [
  {
    id: 1,
    name: "Inter College Cricket Championship",
    sport: "Cricket",
    date: "2026-10-15",
    venue: "Main Ground",
    coordinator: "Prof. Sharma",
    maxParticipants: 110,
    currentParticipants: 88,
    description: "Annual inter-college cricket championship for all branches.",
    status: "Upcoming"
  },
  {
    id: 2,
    name: "Inter College Volleyball Tournament",
    sport: "Volleyball",
    date: "2026-10-20",
    venue: "Sports Complex",
    coordinator: "Dr. Singh",
    maxParticipants: 60,
    currentParticipants: 45,
    description: "Spike your way to victory in this exciting volleyball tournament.",
    status: "Upcoming"
  },
  {
    id: 3,
    name: "Badminton Singles",
    sport: "Badminton",
    date: "2026-11-05",
    venue: "Indoor Stadium",
    coordinator: "Ms. Verma",
    maxParticipants: 32,
    currentParticipants: 32,
    description: "Show off your agility in the Badminton Singles.",
    status: "Ongoing"
  },
  {
    id: 4,
    name: "Chess Championship",
    sport: "Chess",
    date: "2026-11-10",
    venue: "Library Hall",
    coordinator: "Mr. Iyer",
    maxParticipants: 50,
    currentParticipants: 25,
    description: "Battle of minds in the ultimate chess championship.",
    status: "Upcoming"
  },
  {
    id: 5,
    name: "Kabaddi Tournament",
    sport: "Kabaddi",
    date: "2026-11-15",
    venue: "Field B",
    coordinator: "Mr. Patil",
    maxParticipants: 70,
    currentParticipants: 50,
    description: "Experience the thrill of Kabaddi.",
    status: "Upcoming"
  },
  {
    id: 6,
    name: "Athletics Meet",
    sport: "Athletics",
    date: "2026-09-10",
    venue: "Running Track",
    coordinator: "Dr. Rao",
    maxParticipants: 200,
    currentParticipants: 190,
    description: "Various track and field events.",
    status: "Completed"
  },
  {
    id: 7,
    name: "Table Tennis Championship",
    sport: "Table Tennis",
    date: "2026-12-01",
    venue: "Indoor Stadium",
    coordinator: "Ms. Das",
    maxParticipants: 40,
    currentParticipants: 10,
    description: "Fast-paced action in Table Tennis.",
    status: "Upcoming"
  }
];

export const registrations = [
  {
    id: 1,
    studentId: 1,
    studentName: "Alice Johnson",
    studentEmail: "student@gmail.com",
    eventId: 1,
    eventName: "Inter College Cricket Championship",
    sport: "Cricket",
    date: "2026-10-15",
    registrationDate: "2026-09-01",
    status: "Approved",
    result: "Not Declared"
  },
  {
    id: 2,
    studentId: 1,
    studentName: "Alice Johnson",
    studentEmail: "student@gmail.com",
    eventId: 6,
    eventName: "Athletics Meet",
    sport: "Athletics",
    date: "2026-09-10",
    registrationDate: "2026-08-15",
    status: "Completed",
    result: "Winner"
  }
];

export const results = [
  {
    eventId: 6,
    eventName: "Athletics Meet",
    sport: "Athletics",
    winner: "Alice Johnson",
    runnerUp: "Bob Smith",
    status: "Completed"
  }
];
