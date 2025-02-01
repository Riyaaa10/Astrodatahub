type Project = {
    id: number;
    name: string;
    members?: number; // Optional, may not be present in all projects
    access?: string;  // Optional, may not be present in all projects
    description?: string; // Optional for detailed projects
    files?: File[]; // Optional for detailed projects
  };
  