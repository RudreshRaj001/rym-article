import { getUserId, isAdmin } from "@/app/actions";
import { NextResponse } from "next/server";
import db from "@/lib/db";
export async function POST(req: Request) {
  try {
    const admin = await isAdmin();
    const userId = await getUserId();
    if (!admin || !userId) {
      return NextResponse.json(
        { message: "You are not admin" },
        { status: 401 }
      );
    }
    const { title, content, subheading, banner, category, tags } =
      await req.json();

    await db.article.create({
      data: {
        title,
        content,
        subheading,
        banner,
        category,
        tags,
        authorId: userId,
      },
    });

    return NextResponse.json({ message: "Article created" }, { status: 201 });
  } catch (error: any) {
    console.log("Article creation error :", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// PUT

export async function PUT(req: Request) {
  try {
    const admin = await isAdmin();
    if (!admin) {
      return NextResponse.json(
        { message: "You are not admin" },
        { status: 401 }
      );
    }

    const { articleId, title, content, subheading, banner, category, tags } =
      await req.json();

    await db.article.update({
      where: { id: articleId },
      data: {
        title,
        content,
        subheading,
        banner,
        category,
        tags,
      },
    });

    return NextResponse.json({ message: "Article updated" }, { status: 200 });
  } catch (error: any) {
    console.log("Article update error :", error);
    return NextResponse.json(
      { message: "Error updating article" },
      { status: 500 }
    );
  }
}

// delete 

export async function DELETE(req: Request) {
  try {
    const admin = await isAdmin();
    if (!admin) {
      return NextResponse.json(
        { message: "You are not admin" },
        { status: 401 }
      );
    }

    const { articleId } = await req.json();

    await db.article.delete({ where: { id: articleId } });

    return NextResponse.json({ message: "Article deleted" }, { status: 200 });
  } catch (error: any) {
    console.log("Article delete error :", error);
    return NextResponse.json(
      { message: "Error deleting article" },
      { status: 500 }
    );
  }
}



// model Article {
//   id         String   @id @default(auto()) @map("_id") @db.ObjectId
//   title      String
//   subheading String
//   content    String
//   banner     String
//   category   Category
//   tags       String[]
//   author     User     @relation(fields: [authorId], references: [id])
//   authorId   String   @db.ObjectId
//   createdAt  DateTime @default(now())
//   updatedAt  DateTime @updatedAt

//   @@index([category], name: "category_index")
//   @@index([authorId], name: "author_index")
// }
