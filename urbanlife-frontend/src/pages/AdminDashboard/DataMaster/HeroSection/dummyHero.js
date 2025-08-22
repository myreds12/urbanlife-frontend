// Dummy data untuk testing Hero Section
const dummyHeroImages = [
  {
    id: 1,
    title: "Welcome to Our Platform",
    description: "Experience the future of digital innovation with our cutting-edge solutions",
    image_url: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    is_active: true,
    status: "active",
    created_at: "2024-01-15T08:30:00Z",
    updated_at: "2024-01-20T10:15:00Z"
  },
  {
    id: 2,
    title: "Transform Your Business",
    description: "Unlock new possibilities with our comprehensive business solutions",
    image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    is_active: false,
    status: "active",
    created_at: "2024-01-10T14:20:00Z",
    updated_at: "2024-01-18T16:45:00Z"
  },
  {
    id: 3,
    title: "Innovation Starts Here",
    description: "Join thousands of satisfied customers who trust our expertise",
    image_url: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    is_active: false,
    status: "active",
    created_at: "2024-01-08T11:10:00Z",
    updated_at: "2024-01-15T09:30:00Z"
  },
  {
    id: 4,
    title: "Global Excellence",
    description: "Connecting businesses worldwide with reliable and scalable solutions",
    image_url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    is_active: false,
    status: "active",
    created_at: "2024-01-05T09:45:00Z",
    updated_at: "2024-01-12T13:20:00Z"
  },
  {
    id: 5,
    title: "Secure & Reliable",
    description: "Built with enterprise-grade security and 99.9% uptime guarantee",
    image_url: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    is_active: false,
    status: "inactive",
    created_at: "2024-01-01T12:00:00Z",
    updated_at: "2024-01-10T15:30:00Z"
  },
  {
    id: 6,
    title: "24/7 Support Ready",
    description: "Our dedicated team is here to help you succeed every step of the way",
    image_url: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    is_active: false,
    status: "active",
    created_at: "2023-12-28T16:15:00Z",
    updated_at: "2024-01-08T11:45:00Z"
  }
];

// Next ID untuk form (simulasi auto increment)
export const nextHeroId = 7;

// Export default dummy data
export default dummyHeroImages;

// Mock API responses untuk testing
export const mockHeroResponses = {
  // GET /hero-sections
  getAll: {
    success: true,
    message: "Hero images fetched successfully",
    data: dummyHeroImages
  },

  // POST /hero-sections
  create: {
    success: true,
    message: "Hero image created successfully",
    data: {
      id: 7,
      title: "New Hero Image",
      description: "New hero description",
      image_url: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      is_active: false,
      status: "active",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  },

  // PATCH /hero-sections/:id
  update: {
    success: true,
    message: "Hero image updated successfully",
    data: {
      id: 1,
      title: "Updated Hero Title",
      description: "Updated hero description",
      image_url: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      is_active: true,
      status: "active",
      created_at: "2024-01-15T08:30:00Z",
      updated_at: new Date().toISOString()
    }
  },

  // DELETE /hero-sections/:id
  delete: {
    success: true,
    message: "Hero image deleted successfully"
  },

  // PATCH /hero-sections/:id/set-active
  setActive: {
    success: true,
    message: "Hero image set as active successfully",
    data: {
      id: 2,
      title: "Transform Your Business",
      description: "Unlock new possibilities with our comprehensive business solutions",
      image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      is_active: true,
      status: "active",
      created_at: "2024-01-10T14:20:00Z",
      updated_at: new Date().toISOString()
    }
  }
};

// Mock functions untuk development testing
export const mockHeroAPI = {
  // Simulate API delay
  delay: (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms)),
  
  // Mock get all heroes
  getAll: async () => {
    await mockHeroAPI.delay(800);
    return { data: mockHeroResponses.getAll };
  },

  // Mock create hero
  create: async (formData) => {
    await mockHeroAPI.delay(1200);
    console.log('Mock creating hero with data:', formData);
    return { data: mockHeroResponses.create };
  },

  // Mock update hero
  update: async (id, formData) => {
    await mockHeroAPI.delay(1000);
    console.log(`Mock updating hero ${id} with data:`, formData);
    return { data: mockHeroResponses.update };
  },

  // Mock delete hero
  delete: async (id) => {
    await mockHeroAPI.delay(600);
    console.log(`Mock deleting hero ${id}`);
    return { data: mockHeroResponses.delete };
  },

  // Mock set active hero
  setActive: async (id) => {
    await mockHeroAPI.delay(800);
    console.log(`Mock setting hero ${id} as active`);
    return { data: mockHeroResponses.setActive };
  }
};

/* 
CARA PAKAI:

1. Import di HeroSection.jsx untuk testing:
   import dummyHeroImages, { nextHeroId, mockHeroAPI } from "./dummyHero";

2. Ganti fetch calls dengan mock data:
   // Comment out real API calls
   // const { data } = await apiClient.get("/hero-sections");
   
   // Use dummy data instead
   const mockResponse = await mockHeroAPI.getAll();
   setHeroImages(mockResponse.data.data);

3. Atau langsung set state tanpa API call:
   setHeroImages(dummyHeroImages);

4. Uncomment setelah backend siap!
*/