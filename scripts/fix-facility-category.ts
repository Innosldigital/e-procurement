import connectDB from "@/lib/mongodb";
import { Tender } from "@/lib/models/Tender";

async function fixFacilityCategory() {
  await connectDB();

  const result = await Tender.updateMany(
    { category: "Facilities & Venue" },
    { $set: { category: "Facilities (Venue)" } }
  );

  console.log(`Updated ${result.modifiedCount} tenders`);
  process.exit(0);
}

fixFacilityCategory();
