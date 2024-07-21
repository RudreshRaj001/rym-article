import { isAdmin } from "@/app/actions";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { articleId } = await req.json();
    const admin = await isAdmin();

    if (!admin) {
      return NextResponse.json(
        { message: "You are not admin" },
        { status: 401 }
      );
    }

    // Check if the article is currently featured
    const existingFeature = await db.featuredArticle.findUnique({
      where: { articleId },
    });

    let message = "";

    if (existingFeature) {
      // If featured, remove the feature
      await db.featuredArticle.delete({
        where: { articleId },
      });
      message = "Article unfeatured successfully";
    } else {
      // If not featured, add the feature
      await db.featuredArticle.create({
        data: { articleId },
      });
      message = "Article featured successfully";
    }

    return NextResponse.json({ message }, { status: 200 });
  } catch (error: any) {
    console.log("Toggle feature error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// get

// export async function GET(req: Request) {
//   try {
//     const admin = await isAdmin();
//     if (!admin) {
//       return NextResponse.json(
//         { message: "You are not admin" },
//         { status: 401 }
//       );
//     }

//     const featuredArticles = await db.featuredArticle.findMany({
//       include: { article: true },
//     });

//     return NextResponse.json({ featuredArticles }, { status: 200 });
//   } catch (error: any) {
//     console.log("Get featured articles error:", error);
//     return NextResponse.json({ message: error.message }, { status: 500 });
//   }
// }

// model User {
//     id        String    @id @default(auto()) @map("_id") @db.ObjectId
//     email     String    @unique
//     name      String
//     password  String
//     isAdmin   Boolean   @default(false)
//     createdAt DateTime  @default(now())
//     updatedAt DateTime  @updatedAt
//     Article   Article[]
//   }

//   model Article {
//     id              String           @id @default(auto()) @map("_id") @db.ObjectId
//     title           String
//     subheading      String
//     content         String
//     banner          String
//     category        Category
//     tags            String[]
//     author          User             @relation(fields: [authorId], references: [id])
//     authorId        String           @db.ObjectId
//     createdAt       DateTime         @default(now())
//     updatedAt       DateTime         @updatedAt
//     FeaturedArticle FeaturedArticle?

//     @@index([category], name: "category_index")
//     @@index([authorId], name: "author_index")
//   }

//   model FeaturedArticle {
//     id        String   @id @default(auto()) @map("_id") @db.ObjectId
//     article   Article  @relation(fields: [articleId], references: [id])
//     articleId String   @db.ObjectId
//     createdAt DateTime @default(now())
//     updatedAt DateTime @updatedAt

//     @@unique([articleId])
//   }

//   enum Category {
//     Technology
//     Health
//     Lifestyle
//     Travel
//     Business
//     Finance
//     Entertainment
//     Sports
//     Food
//     SelfImprovement
//   }
