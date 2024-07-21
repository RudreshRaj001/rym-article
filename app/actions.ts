import { NextAuthOptions } from "@/lib/authOptions";
import db from "@/lib/db";
import { Category } from "@prisma/client";
import { getServerSession } from "next-auth";

export function invalidateCachedUserDetails(userId: number) {
  if (cachedUserDetails && cachedUserDetails.id === userId) {
    cachedUserDetails = null;
  }
}

export function clearAllCachedUserDetails() {
  cachedUserDetails = null;
}

export function clearCachedUserDetails() {
  cachedUserDetails = null;
}

let cachedUserDetails: any = null;

const pageSize = 10;

export async function getAllUsers() {
  return db.user.findMany();
}

export async function getUserDetails() {
  try {
    if (cachedUserDetails) {
      console.log("logging the cached data....");
      return cachedUserDetails;
    }
    const session = await getServerSession(NextAuthOptions);
    if (!session || !session.user) {
      return null;
    }
    const email = session.user.email;
    if (!email) {
      return null;
    }
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        isAdmin: true,
        createdAt: true,
        isSuperAdmin: true,
      },
    });
    if (!user) {
      return null;
    }
    cachedUserDetails = user;
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// get name

export async function getName() {
  try {
    const user = await getUserDetails();
    if (!user) {
      return null;
    }
    return user.name;
  } catch (error) {
    console.error(error);
    return null;
  }
}
// get uer id

export async function getUserId() {
  try {
    const user = await getUserDetails();
    if (!user) {
      return null;
    }
    return user.id;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function isAuthenticated() {
  try {
    const user = await getUserDetails();
    if (!user) {
      return false;
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// get email

export async function getEmail() {
  try {
    const user = await getUserDetails();
    if (!user) {
      return null;
    }
    return user.email;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// get isAdmin

export async function isAdmin() {
  try {
    const user = await getUserDetails();
    if (!user) {
      return false;
    }
    return user.isAdmin;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// get all articles
// getAllArticles
export async function getAllArticles(page: number) {
  const articles = await db.article.findMany({
    orderBy: {
      createdAt: "desc",
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const totalArticles = await db.article.count();
  const totalPages = Math.ceil(totalArticles / pageSize);
  return { articles, totalPages };
}

export async function getAllArticlesByAdmin(page: number) {
  const articles = await db.article.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      FeaturedArticle: true,
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const totalArticles = await db.article.count();
  const totalPages = Math.ceil(totalArticles / pageSize);
  return { articles, totalPages };
}

// get featured articles
export async function getFeaturedArticles() {
  // return article data who are featured

  const articles = await db.featuredArticle.findMany({
    include: {
      article: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return articles.map((article) => article.article);
}

// get top articles

export async function getTopArticles() {
  return db.article.findMany({
    orderBy: {
      createdAt: "asc",
    },
    take: 7,
  });
}

// get article by id

export async function getArticleById(id: string) {
  return db.article.findUnique({
    where: {
      id,
    },
  });
}

// related articles

export async function getRelatedArticles(articleId: string) {
  return db.article.findMany({
    where: {
      id: {
        not: articleId,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });
}

// get all categories

export async function getAllCategories() {
  const articles = await db.article.findMany({
    distinct: ["category"],
    select: {
      category: true,
    },
  });

  return articles.map((article) => article.category);
}

// get articles by category
const categoryMap: { [key: string]: Category } = {
  technology: Category.Technology,
  health: Category.Health,
  lifestyle: Category.Lifestyle,
  travel: Category.Travel,
  business: Category.Business,
  finance: Category.Finance,
  entertainment: Category.Entertainment,
  sports: Category.Sports,
  food: Category.Food,
  selfimprovement: Category.SelfImprovement,
};

export async function getArticlesByCategory(category: string, page: number) {
  const enumCategory = categoryMap[category.toLowerCase()];

  if (!enumCategory) {
    throw new Error(`Invalid category: ${category}`);
  }

  const articles = await db.article.findMany({
    where: {
      category: enumCategory,
    },
    orderBy: {
      createdAt: "desc",
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const totalArticles = await db.article.count({
    where: {
      category: enumCategory,
    },
  });
  const totalPages = Math.ceil(totalArticles / pageSize);
  return { articles, totalPages };
}

// isSuperAdmin

export async function isSuperAdmin() {
  try {
    const user = await getUserDetails();
    if (!user) {
      return false;
    }
    return user.isSuperAdmin;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// get all users

export async function getAllUsersBySuperAdmin(page: number) {
  const users = await db.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const totalUsers = await db.user.count();
  const totalPages = Math.ceil(totalUsers / pageSize);
  return { users, totalPages };
}

// get userdetails by id

export async function getUserDetailsById(id: string) {
  return db.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      isAdmin: true,
      isSuperAdmin: true,
      createdAt: true,
    },
  });
}

// get stats

export async function getStats() {
  const totalArticles = await db.article.count();
  const totalUsers = await db.user.count();
  const featuredArticles = await db.featuredArticle.count();
  return { totalArticles, totalUsers, featuredArticles };
}

// model User {
//   id           String    @id @default(auto()) @map("_id") @db.ObjectId
//   email        String    @unique
//   name         String
//   password     String
//   isAdmin      Boolean   @default(false)
//   isSuperAdmin Boolean   @default(false)
//   createdAt    DateTime  @default(now())
//   updatedAt    DateTime  @updatedAt
//   Article      Article[]
// }

// model Article {
//   id              String           @id @default(auto()) @map("_id") @db.ObjectId
//   title           String
//   subheading      String
//   content         String
//   banner          String
//   category        Category
//   tags            String[]
//   author          User             @relation(fields: [authorId], references: [id])
//   authorId        String           @db.ObjectId
//   createdAt       DateTime         @default(now())
//   updatedAt       DateTime         @updatedAt
//   FeaturedArticle FeaturedArticle?

//   @@index([category], name: "category_index")
//   @@index([authorId], name: "author_index")
// }

// model FeaturedArticle {
//   id        String   @id @default(auto()) @map("_id") @db.ObjectId
//   article   Article  @relation(fields: [articleId], references: [id], onDelete: Cascade)
//   articleId String   @db.ObjectId
//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt

//   @@unique([articleId])
// }

// enum Category {
//   Technology
//   Health
//   Lifestyle
//   Travel
//   Business
//   Finance
//   Entertainment
//   Sports
//   Food
//   SelfImprovement
// }
