import { BlogPost } from "../../../../core/types";

export const VOXELAND_BLOG_DATA: BlogPost[] = [
  {
    id: "0",
    title: "New Content",
    slug: "new-content",
    date: "25/05/2024",
    author: "ZTorm",
    tags: ["update", "content"],
    gameId: "voxeland",
    shortContent:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel dapibus tortor, ut vestibulum massa.",
    content: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel dapibus tortor, ut vestibulum massa. Cras aliquet maximus nunc sed posuere. Aenean condimentum volutpat sapien a auctor. Nulla facilisi. Maecenas at mattis ligula. In sit amet massa et lacus tempus ultrices. Nullam in eros orci. Curabitur cursus auctor lectus in pretium. Cras dapibus, enim et auctor tincidunt, urna tellus tincidunt eros, ac aliquet risus nisi vel libero. Donec vulputate purus at enim mollis commodo.

      Integer eu elementum lorem. Quisque vehicula purus sed ligula consequat, eget tincidunt ligula convallis. Duis ultrices, mi sed rhoncus gravida, nunc nisi rutrum turpis, ut ornare mi quam condimentum sem. Etiam finibus est ac elit pretium dignissim. Ut quis dapibus risus. Quisque condimentum sapien nec commodo vestibulum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis nunc est, aliquam sed consectetur in, molestie eu tellus. Ut nec sapien venenatis nisl pulvinar gravida. Duis dui quam, rhoncus vitae lacinia quis, fringilla sit amet nunc.
    `,
    imageUrl: "/assets/img/voxeland/cube-world.webp",
  },
  {
    id: "1",
    title: "New Update",
    slug: "new-update-1",
    date: "21/06/2024",
    author: "ZTorm",
    tags: ["update", "patch"],
    gameId: "voxeland",
    shortContent:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel dapibus tortor, ut vestibulum massa.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel dapibus tortor, ut vestibulum massa.",
    imageUrl: "/assets/img/voxeland/cube-world.webp",
  },
  {
    id: "2",
    title: "New Update",
    slug: "new-update-2",
    date: "24/07/2024",
    author: "ZTorm",
    tags: ["update", "patch"],
    gameId: "voxeland",
    shortContent:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel dapibus tortor, ut vestibulum massa.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel dapibus tortor, ut vestibulum massa.",
    imageUrl: "/assets/img/voxeland/cube-world.webp",
  },
  {
    id: "3",
    title: "New Update",
    slug: "new-update-3",
    date: "25/09/2024",
    author: "ZTorm",
    tags: ["update", "patch"],
    gameId: "voxeland",
    shortContent:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel dapibus tortor, ut vestibulum massa.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel dapibus tortor, ut vestibulum massa.",
    imageUrl: "/assets/img/voxeland/cube-world.webp",
  },
  {
    id: "4",
    title: "New Update",
    slug: "new-update-4",
    date: "04/10/2024",
    author: "ZTorm",
    tags: ["update", "patch"],
    gameId: "voxeland",
    shortContent:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel dapibus tortor, ut vestibulum massa.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel dapibus tortor, ut vestibulum massa.",
    imageUrl: "/assets/img/voxeland/cube-world.webp",
  },
];

// Helper functions
export const getVoxelandBlogPosts = (limit?: number): BlogPost[] => {
  const sortedPosts = VOXELAND_BLOG_DATA.sort((a, b) => {
    const dateA = new Date(convertDateToISO(a.date)).getTime();
    const dateB = new Date(convertDateToISO(b.date)).getTime();
    return dateB - dateA; // Descending order
  });

  return limit ? sortedPosts.slice(0, limit) : sortedPosts;
};

export const getVoxelandBlogPostById = (id: string): BlogPost | undefined => {
  return VOXELAND_BLOG_DATA.find((post) => post.id === id);
};

export const getVoxelandBlogPostBySlug = (
  slug: string
): BlogPost | undefined => {
  return VOXELAND_BLOG_DATA.find((post) => post.slug === slug);
};

// Utility function for date conversion
const convertDateToISO = (dateStr: string): string => {
  const [day, month, year] = dateStr.split("/");
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
};
