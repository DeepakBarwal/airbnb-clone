type Listing = {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  rating: number;
  published: boolean;
  ownerId: number;
};

export const data: Listing[] = [
  {
    id: 1,
    name: "Cozy Cottage",
    description: "A charming cottage in a peaceful location.",
    image:
      "https://images.unsplash.com/photo-1623050804066-42bcedb4e81d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2371&q=80",
    price: 100,
    rating: 4.5,
    published: true,
    ownerId: 1,
  },
  {
    id: 2,
    name: "Luxury Villa",
    description: "A luxurious villa with breathtaking views.",
    image:
      "https://images.unsplash.com/photo-1638929798283-3df3a0c7e039?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2369&q=80",
    price: 300,
    rating: 5,
    published: true,
    ownerId: 1,
  },
  {
    id: 3,
    name: "Seaside Retreat",
    description: "An idyllic seaside retreat for a relaxing vacation.",
    image:
      "https://images.unsplash.com/photo-1644027622521-d0ca669c40d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80",
    price: 150,
    rating: 4.8,
    published: true,
    ownerId: 1,
  },
  {
    id: 4,
    name: "Mountain Cabin",
    description: "A cozy cabin nestled in the mountains.",
    image:
      "https://images.unsplash.com/photo-1629078691977-dc51747c0263?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2369&q=80",
    price: 120,
    rating: 4.2,
    published: true,
    ownerId: 1,
  },
  {
    id: 5,
    name: "City Apartment",
    description: "A modern apartment in the heart of the city.",
    image:
      "https://images.unsplash.com/photo-1559599189-fe84dea4eb79?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2369&q=80",
    price: 200,
    rating: 4.7,
    published: true,
    ownerId: 1,
  },
  {
    id: 6,
    name: "Rustic Farmhouse",
    description: "A charming farmhouse surrounded by nature.",
    image:
      "https://images.unsplash.com/photo-1620332372374-f108c53d2e03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1772&q=80",
    price: 180,
    rating: 4.4,
    published: true,
    ownerId: 1,
  },
];
