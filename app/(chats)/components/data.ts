export interface Message {
  id: number;
  sender: string;
  avatar: string;
  content: string;
  timestamp: string;
  isOwn?: boolean;
  reactions?: string[];
}

export interface GroupChat {
  id: number;
  name: string;
  icon: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  members: number;
  online: number;
}

export const groupChats: GroupChat[] = [
  {
    id: 1,
    name: "Dev Team 🚀",
    icon: "💻",
    lastMessage: "Sarah: Just pushed the new feature!",
    timestamp: "2m",
    unread: 3,
    members: 12,
    online: 8,
  },
  {
    id: 2,
    name: "Design Squad",
    icon: "🎨",
    lastMessage: "Mike: Check out these mockups",
    timestamp: "15m",
    unread: 0,
    members: 8,
    online: 5,
  },
  {
    id: 3,
    name: "Weekend Warriors",
    icon: "⚽",
    lastMessage: "Alex: Who's in for Saturday?",
    timestamp: "1h",
    unread: 7,
    members: 15,
    online: 3,
  },
  {
    id: 4,
    name: "Book Club 📚",
    icon: "📖",
    lastMessage: "Emma: Finished chapter 10!",
    timestamp: "2h",
    unread: 0,
    members: 10,
    online: 2,
  },
  {
    id: 5,
    name: "Food Lovers",
    icon: "🍕",
    lastMessage: "David: New restaurant downtown!",
    timestamp: "3h",
    unread: 12,
    members: 20,
    online: 6,
  },
  {
    id: 6,
    name: "Gaming Squad",
    icon: "🎮",
    lastMessage: "Chris: Raid tonight at 8?",
    timestamp: "4h",
    unread: 0,
    members: 18,
    online: 12,
  },
  {
    id: 7,
    name: "Fitness Fam",
    icon: "💪",
    lastMessage: "Lisa: Morning run anyone?",
    timestamp: "5h",
    unread: 2,
    members: 14,
    online: 4,
  },
  {
    id: 8,
    name: "Travel Buddies",
    icon: "✈️",
    lastMessage: "Tom: Barcelona pics uploaded!",
    timestamp: "1d",
    unread: 0,
    members: 11,
    online: 3,
  },
];

export const messages: Message[] = [
  {
    id: 1,
    sender: "Sarah Chen",
    avatar: "👩‍💻",
    content:
      "Hey team! Just finished the new authentication module. Ready for review!",
    timestamp: "10:24 AM",
  },
  {
    id: 2,
    sender: "Mike Rodriguez",
    avatar: "👨‍🎨",
    content: "Awesome work Sarah! I'll take a look this afternoon.",
    timestamp: "10:26 AM",
    reactions: ["👍", "🎉"],
  },
  {
    id: 3,
    sender: "Alex Kim",
    avatar: "👨‍💼",
    content:
      "Can someone help me debug this weird issue with the API? Getting a 403 error randomly.",
    timestamp: "10:30 AM",
  },
  {
    id: 4,
    sender: "You",
    avatar: "😊",
    content: "Sure! Can you share the error logs?",
    timestamp: "10:31 AM",
    isOwn: true,
  },
  {
    id: 5,
    sender: "Alex Kim",
    avatar: "👨‍💼",
    content:
      "Here's what I'm seeing: Error: Forbidden - Invalid token signature",
    timestamp: "10:32 AM",
  },
  {
    id: 6,
    sender: "Sarah Chen",
    avatar: "👩‍💻",
    content:
      "Oh I've seen this before! Check if your JWT secret matches in both environments.",
    timestamp: "10:33 AM",
    reactions: ["💡"],
  },
  {
    id: 7,
    sender: "Emma Watson",
    avatar: "👩‍🔬",
    content:
      "Also make sure you're not using expired tokens. That got me last week 😅",
    timestamp: "10:35 AM",
  },
  {
    id: 8,
    sender: "Alex Kim",
    avatar: "👨‍💼",
    content:
      "Omg that was it! The env file wasn't updated. Thanks everyone! 🙏",
    timestamp: "10:37 AM",
    reactions: ["🎉", "✅", "👏"],
  },
  {
    id: 9,
    sender: "Mike Rodriguez",
    avatar: "👨‍🎨",
    content: "Classic! Happens to the best of us 😄",
    timestamp: "10:38 AM",
  },
  {
    id: 10,
    sender: "You",
    avatar: "😊",
    content: "Glad we could help! Team work makes the dream work ✨",
    timestamp: "10:39 AM",
    isOwn: true,
    reactions: ["❤️", "🚀"],
  },
];
