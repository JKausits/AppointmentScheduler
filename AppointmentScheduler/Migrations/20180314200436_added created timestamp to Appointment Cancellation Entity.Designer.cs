﻿// <auto-generated />
using AppointmentScheduler.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using MySql.Data.EntityFrameworkCore.Storage.Internal;
using System;

namespace AppointmentScheduler.Migrations
{
    [DbContext(typeof(AppointmentSchedulerContext))]
    [Migration("20180314200436_added created timestamp to Appointment Cancellation Entity")]
    partial class addedcreatedtimestamptoAppointmentCancellationEntity
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.1-rtm-125");

            modelBuilder.Entity("AppointmentScheduler.Entities.Appointment", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("BannerID");

                    b.Property<string>("CancelCode");

                    b.Property<DateTime>("CreatedAt");

                    b.Property<DateTime>("DateTime");

                    b.Property<string>("Email");

                    b.Property<string>("FirstName");

                    b.Property<string>("LastName");

                    b.Property<DateTime>("ModifiedAt");

                    b.Property<int>("ProfessorID");

                    b.Property<int>("Status");

                    b.HasKey("ID");

                    b.HasIndex("ProfessorID");

                    b.ToTable("Appointments");
                });

            modelBuilder.Entity("AppointmentScheduler.Entities.AppointmentCancellation", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("Created");

                    b.Property<DateTime>("DateTime");

                    b.Property<string>("Email");

                    b.Property<string>("FirstName");

                    b.Property<string>("LastName");

                    b.Property<int>("ProfessorID");

                    b.Property<string>("Reason");

                    b.Property<int>("Status");

                    b.HasKey("ID");

                    b.HasIndex("ProfessorID");

                    b.ToTable("AppointmentCancellations");
                });

            modelBuilder.Entity("AppointmentScheduler.Entities.Professor", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("Active");

                    b.Property<bool>("Admin");

                    b.Property<string>("Email");

                    b.Property<string>("Name");

                    b.Property<string>("Password");

                    b.Property<string>("RoomNumber");

                    b.Property<string>("Title");

                    b.HasKey("ID");

                    b.ToTable("Professors");
                });

            modelBuilder.Entity("AppointmentScheduler.Entities.ScheduledHour", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedAt");

                    b.Property<DateTime>("EndDate");

                    b.Property<TimeSpan>("EndTime");

                    b.Property<bool>("Friday");

                    b.Property<DateTime>("ModifiedAt");

                    b.Property<bool>("Monday");

                    b.Property<int>("ProfessorID");

                    b.Property<DateTime>("StartDate");

                    b.Property<TimeSpan>("StartTime");

                    b.Property<bool>("Thursday");

                    b.Property<bool>("Tuesday");

                    b.Property<int>("TypeID");

                    b.Property<bool>("Wednesday");

                    b.HasKey("ID");

                    b.HasIndex("ProfessorID");

                    b.ToTable("ScheduledHours");
                });

            modelBuilder.Entity("AppointmentScheduler.Entities.Appointment", b =>
                {
                    b.HasOne("AppointmentScheduler.Entities.Professor", "Professor")
                        .WithMany()
                        .HasForeignKey("ProfessorID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("AppointmentScheduler.Entities.AppointmentCancellation", b =>
                {
                    b.HasOne("AppointmentScheduler.Entities.Professor", "Professor")
                        .WithMany()
                        .HasForeignKey("ProfessorID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("AppointmentScheduler.Entities.ScheduledHour", b =>
                {
                    b.HasOne("AppointmentScheduler.Entities.Professor", "Professor")
                        .WithMany()
                        .HasForeignKey("ProfessorID")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
