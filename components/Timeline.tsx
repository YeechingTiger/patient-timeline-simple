// components/Timeline.js
import { useEffect, useRef } from "react";
import { DataSet, Timeline } from "vis-timeline/standalone";
import "vis-timeline/styles/vis-timeline-graph2d.min.css";

const data = {
  encounters: [
    {
      encounter_id: "E001",
      start_date: "2024-09-10",
      type: "Outpatient",
      department: "Cardiology",
    },
    {
      encounter_id: "E002",
      start_date: "2024-09-12",
      end_date: "2024-09-13",
      type: "Inpatient",
      department: "Oncology",
    },
    {
      encounter_id: "E003",
      start_date: "2024-09-15",
      type: "Emergency",
      department: "Emergency",
    },
    {
      encounter_id: "E004",
      start_date: "2024-09-17",
      end_date: "2024-09-20",
      type: "Inpatient",
      department: "Orthopedics",
    },
    {
      encounter_id: "E005",
      start_date: "2024-09-22",
      type: "Outpatient",
      department: "Dermatology",
    },
  ],
  diagnoses: [
    {
      diagnosis_id: "D101",
      description: "Type 2 Diabetes Mellitus",
      date: "2024-09-10",
    },
    {
      diagnosis_id: "D102",
      description: "Hypertension",
      date: "2024-09-12",
    },
    {
      diagnosis_id: "D103",
      description: "Chronic Kidney Disease",
      date: "2024-09-15",
    },
    {
      diagnosis_id: "D104",
      description: "Acute Bronchitis",
      date: "2024-09-17",
    },
    {
      diagnosis_id: "D105",
      description: "Osteoarthritis",
      date: "2024-09-22",
    },
  ],
  procedures: [
    {
      procedure_id: "P201",
      description: "Knee Arthroscopy",
      date: "2024-09-10",
    },
    {
      procedure_id: "P202",
      description: "Appendectomy",
      date: "2024-09-12",
    },
    {
      procedure_id: "P203",
      description: "Cataract Surgery",
      date: "2024-09-15",
    },
    {
      procedure_id: "P204",
      description: "Tonsillectomy",
      date: "2024-09-17",
    },
    {
      procedure_id: "P205",
      description: "Coronary Angioplasty",
      date: "2024-09-22",
    },
  ],
  medications: [
    {
      medication_id: "M301",
      name: "Metformin",
      dosage: "500 mg",
      frequency: "Twice daily",
      start_date: "2024-09-10",
      end_date: "2024-12-19",
    },
    {
      medication_id: "M302",
      name: "Lisinopril",
      dosage: "20 mg",
      frequency: "Once daily",
      start_date: "2024-09-12",
      end_date: "2024-09-19",
    },
    {
      medication_id: "M303",
      name: "Furosemide",
      dosage: "40 mg",
      frequency: "Once daily",
      start_date: "2024-09-15",
      end_date: "2024-11-24",
    },
    {
      medication_id: "M304",
      name: "Amoxicillin",
      dosage: "500 mg",
      frequency: "Three times daily",
      start_date: "2024-09-17",
      end_date: "2024-09-24",
    },
    {
      medication_id: "M305",
      name: "Celecoxib",
      dosage: "200 mg",
      frequency: "Once daily",
      start_date: "2024-09-22",
      end_date: "2024-11-24",
    },
  ],
  lab_tests: [
    {
      lab_test_id: "L401",
      name: "Complete Blood Count (CBC)",
      date: "2024-09-10",
      result: "Normal",
    },
    {
      lab_test_id: "L402",
      name: "Lipid Panel",
      date: "2024-09-12",
      result: "Elevated LDL",
    },
    {
      lab_test_id: "L403",
      name: "Liver Function Test",
      date: "2024-09-15",
      result: "Normal",
    },
    {
      lab_test_id: "L404",
      name: "Thyroid Function Test",
      date: "2024-09-17",
      result: "Low T3",
    },
    {
      lab_test_id: "L405",
      name: "Hemoglobin A1C",
      date: "2024-09-22",
      result: "7.2%",
    },
  ],

  progress_notes: [
    {
      note_id: "N501",
      content:
        "Patient reports increasing fatigue and discomfort in chest. Suggested to monitor symptoms and follow up if condition worsens.",
      date: "2024-09-10",
    },
    {
      note_id: "N502",
      content:
        "Reviewed patient's medication adherence. Patient is compliant with the prescribed regimen.",
      date: "2024-09-12",
    },
    {
      note_id: "N503",
      content:
        "Patient shows signs of improvement in respiratory function. Continuing current treatment plan.",
      date: "2024-09-15",
    },
    {
      note_id: "N504",
      content:
        "Patient expressed concerns about side effects of new medication. Discussed potential adjustments.",
      date: "2024-09-17",
    },
    {
      note_id: "N505",
      content:
        "Pre-operative assessment completed. Patient cleared for upcoming surgical procedure.",
      date: "2024-09-22",
    },
  ],
  discharge_notes: [
    {
      note_id: "N506",
      content:
        "Patient discharged following routine appendectomy. Provided post-operative care instructions and follow-up schedule.",
      date: "2024-09-10",
    },
    {
      note_id: "N507",
      content:
        "Successfully managed acute episode, patient stable and discharged with medication adjustments.",
      date: "2024-09-12",
    },
    {
      note_id: "N508",
      content:
        "Patient discharged after stabilization of cardiac symptoms. Advised lifestyle modifications and regular monitoring.",
      date: "2024-09-15",
    },
    {
      note_id: "N509",
      content:
        "Discharged post-recovery from knee surgery. Outpatient physical therapy recommended.",
      date: "2024-09-17",
    },
    {
      note_id: "N510",
      content:
        "Patient released with instructions for home care after minor surgical intervention. Return visit scheduled in two weeks.",
      date: "2024-09-22",
    },
  ],
  pathology_reports: [
    {
      note_id: "N511",
      content:
        "Biopsy results indicate benign tumor. No further intervention required at this time.",
      date: "2024-09-10",
    },
    {
      note_id: "N512",
      content:
        "Liver biopsy shows early signs of fibrosis. Recommended follow-up testing and consultation with a hepatologist.",
      date: "2024-09-12",
    },
    {
      note_id: "N513",
      content:
        "Pathology confirms diagnosis of basal cell carcinoma. Surgical excision has been scheduled.",
      date: "2024-09-15",
    },
    {
      note_id: "N514",
      content:
        "Thyroid nodule biopsy indicates papillary carcinoma. Referral to oncology for further management.",
      date: "2024-09-17",
    },
    {
      note_id: "N515",
      content:
        "Skin biopsy results show dermatitis. Prescribed topical steroids and follow-up in one month.",
      date: "2024-09-22",
    },
  ],
  radiology_reports: [
    {
      note_id: "N516",
      content:
        "Chest X-ray shows no evidence of acute disease. Heart and lungs appear normal.",
      date: "2024-09-10",
    },
    {
      note_id: "N517",
      content:
        "Abdominal ultrasound reveals gallstones. Consultation with gastroenterology advised for possible intervention.",
      date: "2024-09-12",
    },
    {
      note_id: "N518",
      content:
        "CT scan of the head rules out intracranial bleed. Continue monitoring neurological symptoms.",
      date: "2024-09-15",
    },
    {
      note_id: "N519",
      content:
        "MRI of the spine shows herniated disc at L4-L5. Discussing surgical and non-surgical options with patient.",
      date: "2024-09-17",
    },
    {
      note_id: "N520",
      content:
        "Ultrasound of the thyroid shows multiple nodules. Fine needle aspiration recommended.",
      date: "2024-09-22",
    },
  ],
};

const TimelineComponent = () => {
  const timelineRef = useRef(null);
  let timeline: any;

  useEffect(() => {
    // create a data set with groups
    var groups = new DataSet();

    groups.add([
      {
        id: 1,
        content: "Encounter",
      },

      {
        id: 2,
        content: "Diagnosis",
      },
      {
        id: 3,
        content: "Procedure",
      },
      {
        id: 4,
        content: "Medication",
      },
      {
        id: 5,
        content: "Lab test",
      },
      {
        id: 6,
        content: "Clinical Notes",
        nestedGroups: [11, 12, 13, 14],
      },
    ]);

    groups.add([
      {
        id: 11,
        content: "Progress Notes",
      },
      {
        id: 12,
        content: "Discharge Notes",
      },
      {
        id: 13,
        content: "Pathology report",
      },
      {
        id: 14,
        content: "Radiology report",
      },
    ]);

    // create a dataset with items
    var items = new DataSet();

    for (const dataKey of Object.keys(data)) {
      if (dataKey === "encounters") {
        for (const encounter of data[dataKey]) {
          let encounterItem: any = {
            id: encounter.encounter_id,
            group: 1,
            content: encounter.type,
            start: encounter.start_date,
            title: `Department: ${encounter.department}`,
          };

          // Conditionally add the end date if it exists
          if (encounter.end_date) {
            (encounterItem.type = "range"),
              (encounterItem.end = encounter.end_date);
          } else {
            encounterItem.type = "point";
          }

          // Add the constructed object to items
          items.add(encounterItem);
        }
      } else if (dataKey === "diagnoses") {
        for (const diagnosis of data[dataKey]) {
          items.add({
            id: diagnosis.diagnosis_id,
            group: 2,
            content: diagnosis.description,
            start: diagnosis.date,
            type: "point",
          });
        }
      } else if (dataKey === "procedures") {
        for (const procedure of data[dataKey]) {
          items.add({
            id: procedure.procedure_id,
            group: 3,
            content: procedure.description,
            start: procedure.date,
            type: "point",
          });
        }
      } else if (dataKey === "medications") {
        for (const medication of data[dataKey]) {
          let medicationItem: any = {
            id: medication.medication_id,
            group: 4,
            content: medication.name,
            start: medication.start_date,
            end: medication.end_date,
            type: "range",
            title: `Dosage: ${medication.dosage}, Frequency: ${medication.frequency}`,
          };

          // Add the constructed object to items
          items.add(medicationItem);
        }
      } else if (dataKey === "lab_tests") {
        for (const labTest of data[dataKey]) {
          items.add({
            id: labTest.lab_test_id,
            group: 5,
            content: labTest.name,
            start: labTest.date,
            type: "point",
            title: `Result: ${labTest.result}`,
          });
        }
      } else if (dataKey === "progress_notes") {
        for (const progressNote of data[dataKey]) {
          items.add({
            id: progressNote.note_id,
            group: 11,
            content: "Progress Note",
            start: progressNote.date,
            type: "point",
            title: progressNote.content,
          });
        }
      } else if (dataKey === "discharge_notes") {
        for (const dischargeNote of data[dataKey]) {
          items.add({
            id: dischargeNote.note_id,
            group: 12,
            content: "Discharge Note",
            start: dischargeNote.date,
            type: "point",
            title: dischargeNote.content,
          });
        }
      } else if (dataKey === "pathology_reports") {
        for (const pathologyReport of data[dataKey]) {
          items.add({
            id: pathologyReport.note_id,
            group: 13,
            content: "Pathology Report",
            start: pathologyReport.date,
            type: "point",
            title: pathologyReport.content,
          });
        }
      } else if (dataKey === "radiology_reports") {
        for (const radiologyReport of data[dataKey]) {
          items.add({
            id: radiologyReport.note_id,
            group: 14,
            content: "Radiology Report",
            start: radiologyReport.date,
            type: "point",
            title: radiologyReport.content,
          });
        }
      }
    }

    var options = {
      groupOrder: "id", // groupOrder can be a property name or a sorting function
      zoomMin: 1000 * 60 * 60 * 24, // One day in milliseconds
      zoomMax: 1000 * 60 * 60 * 24 * 31 * 6, // Approximately one month
      // Format for the labels
      format: {
        minorLabels: {
          day: "D",
        },
        majorLabels: {
          month: "MMMM YYYY",
        },
      },
      // Show only dates in the timeline
      timeAxis: { scale: "day", step: 1 },
      zoomable: false,
      orientation: 'top'
    };
    // Create a Timeline
    timeline = new Timeline(timelineRef.current, items, groups, options);

    // Clean up on unmount
    return () => timeline.destroy();
  }, []);

  const zoomIn = () => {
    timeline.zoomIn(0.5);
  };

  // Function to zoom out
  const zoomOut = () => {
    timeline.zoomOut(0.5);
  };

  return (
    <div>
      <button onClick={zoomIn}>Zoom In</button>
      <br></br>
      <button onClick={zoomOut}>Zoom Out</button>
      <div ref={timelineRef} style={{ height: "300px" }} />
    </div>
  );
};

export default TimelineComponent;
