using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace AppointmentScheduler.Migrations
{
    public partial class AddinitialScheduledHourentity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ScheduledHours",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("MySQL:AutoIncrement", true),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    EndDate = table.Column<DateTime>(nullable: false),
                    EndTime = table.Column<TimeSpan>(nullable: false),
                    Friday = table.Column<bool>(nullable: false),
                    ModifiedAt = table.Column<DateTime>(nullable: false),
                    Monday = table.Column<bool>(nullable: false),
                    ProfessorID = table.Column<int>(nullable: false),
                    StartDate = table.Column<DateTime>(nullable: false),
                    StartTime = table.Column<TimeSpan>(nullable: false),
                    Thursday = table.Column<bool>(nullable: false),
                    Tuesday = table.Column<bool>(nullable: false),
                    TypeID = table.Column<int>(nullable: false),
                    Wednesday = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ScheduledHours", x => x.ID);
                    table.ForeignKey(
                        name: "FK_ScheduledHours_Professors_ProfessorID",
                        column: x => x.ProfessorID,
                        principalTable: "Professors",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ScheduledHours_ProfessorID",
                table: "ScheduledHours",
                column: "ProfessorID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ScheduledHours");
        }
    }
}
