import "dotenv/config";
import express from "express";
import routes from "./src/routes";
import swaggerConfig from "./swaggerConfig";
import error from "./src/middlewares/error";
import prisma from "./config/prisma";
import DashboardService from "./src/services/DashboardService";
const cron = require('node-cron');

const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set up Swagger
swaggerConfig(app);

// Routes
app.use("/api", routes);

app.use(error);

app.get("/", (req, res) => {
    return res.send("Hi Everyone.");
});

cron.schedule('0 0 0 31 12 *', updateApprovedProgramsToExpired);

// updateApprovedProgramsToExpired()
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));

async function updateApprovedProgramsToExpired() {
    try {
      // Fetch all approved programs
      const approvedPrograms = await prisma.program.findMany({
        where: {
          status: 'APPROVED'
        }
      });
  
      // Update the status of each approved program to expired
      const updatePromises: any = approvedPrograms.slice(0,2).map(program => {
        return prisma.program.update({
          where: { id: program.id },
          data: { status: 'EXPIRED' }
        });
      });
  
      // Execute all updates in parallel
      await Promise.all(updatePromises);
     
    const programs = await prisma.program.findMany({
        where: { status: 'APPROVED' },
        select: {
            programBudget: true,
            // employee: true,
            // supply_expense: true,
        },
    });

    const totalApprovedProgrambudget: any = programs?.reduce((sum: any, item: any) => sum + item.programBudget, 0);
    const counts = await DashboardService.updateTotalBudget(1, String(totalApprovedProgrambudget));
      console.log('All approved programs have been updated to expired.', counts);
    } catch (error) {
      console.error('Error updating programs:', error);
    } finally {
      // Disconnect Prisma Client
      await prisma.$disconnect();
    }
  }