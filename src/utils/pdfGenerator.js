import jsPDF from 'jspdf';

const TERRA = [192, 82, 42];
const GOLD  = [212, 160, 23];
const DARK  = [26,  16,   8];
const WHITE = [255, 255, 255];
const MUTED = [120, 100, 80];

export function generateAppointmentPDF(appointment) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const W = doc.internal.pageSize.getWidth();
  const H = doc.internal.pageSize.getHeight();

  doc.setFillColor(...TERRA);
  doc.rect(0, 0, W, 45, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(...WHITE);
  doc.text('Biraj Dental Pvt. Ltd.', W/2, 16, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text('बिराज डेण्टल प्रा. लि.', W/2, 24, { align: 'center' });
  doc.setFontSize(9);
  doc.text('Gathaghar Chowk, Bhaktapur  |  9851031257  |  mainalibr@gmail.com', W/2, 33, { align: 'center' });
  doc.setFontSize(8);
  doc.setTextColor(255, 220, 180);
  doc.text('"Your Smile is Important to Us."', W/2, 41, { align: 'center' });

  doc.setTextColor(...DARK);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('APPOINTMENT CONFIRMATION', W/2, 57, { align: 'center' });
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.6);
  doc.line(60, 60, W-60, 60);

  doc.setDrawColor(...TERRA);
  doc.setLineWidth(1);
  doc.roundedRect(55, 63, W-110, 20, 3, 3);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...MUTED);
  doc.text('BOOKING ID', W/2, 70, { align: 'center' });
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(...TERRA);
  doc.text(appointment.id, W/2, 78, { align: 'center' });

  function sectionHeader(label, y) {
    doc.setFillColor(...TERRA);
    doc.rect(15, y, W-30, 7, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...WHITE);
    doc.text(label, 18, y+5);
    return y + 7;
  }

  function dataRow(label, value, y, shade) {
    if (shade) { doc.setFillColor(250, 244, 236); doc.rect(15, y, W-30, 8, 'F'); }
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...MUTED);
    doc.text(label, 18, y+5.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...DARK);
    doc.text(String(value ?? '—'), 75, y+5.5);
    return y + 8;
  }

  let y = 87;
  y = sectionHeader('PATIENT DETAILS', y);
  y = dataRow('Full Name',  appointment.patient.name,   y, false);
  y = dataRow('Email',      appointment.patient.email,  y, true);
  y = dataRow('Phone',      appointment.patient.phone,  y, false);
  y = dataRow('Age',        appointment.patient.age || '—', y, true);
  y = dataRow('Gender',     appointment.patient.gender || '—', y, false);

  y += 5;
  y = sectionHeader('APPOINTMENT DETAILS', y);
  y = dataRow('Service',    appointment.appointment.service, y, false);
  y = dataRow('Branch',     appointment.appointment.branch === 'suryabinayak' ? 'Suryabinayak (Main Branch)' : 'Gatthaghar Branch', y, true);
  y = dataRow('Date',       new Date(appointment.appointment.date + 'T12:00:00').toLocaleDateString('en-NP', { weekday:'long', year:'numeric', month:'long', day:'numeric' }), y, false);
  y = dataRow('Time',       appointment.appointment.timeSlot, y, true);
  if (appointment.appointment.notes) {
    y = dataRow('Notes',    appointment.appointment.notes, y, false);
  }

  y += 10;
  doc.setDrawColor(...TERRA);
  doc.setLineWidth(0.5);
  doc.roundedRect(15, y, W-30, 32, 3, 3);
  doc.setFillColor(253, 240, 235);
  doc.roundedRect(15, y, W-30, 32, 3, 3, 'F');
  doc.setDrawColor(...TERRA);
  doc.roundedRect(15, y, W-30, 32, 3, 3, 'S');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...TERRA);
  doc.text('IMPORTANT INFORMATION', 20, y+7);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...DARK);
  doc.text('- Please arrive at least 10 minutes before your appointment time.', 20, y+14);
  doc.text('- Bring a valid government-issued ID (citizenship, passport, or license).', 20, y+20);
  doc.text('- To reschedule or cancel: call 9851031257 at least 24 hours ahead.', 20, y+26);

  doc.setDrawColor(210, 195, 175);
  doc.setLineWidth(0.3);
  doc.line(15, H-22, W-15, H-22);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...MUTED);
  doc.text('Gathaghar Chowk, Bhaktapur, Nepal', W/2, H-16, { align: 'center' });
  doc.text('Phone: 9851031257  |  Email: mainalibr@gmail.com  |  birajdental.com.np', W/2, H-11, { align: 'center' });

  doc.setTextColor(240, 232, 220);
  doc.setFontSize(68);
  doc.setFont('helvetica', 'bold');
  doc.text('CONFIRMED', W/2, 180, { align: 'center', angle: 38 });

  doc.save(`biraj-dental-${appointment.id}.pdf`);
}