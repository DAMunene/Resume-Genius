import ResumePreview from './resume-preview';

export async function generateStaticParams() {
  // In a real application, this would fetch resume IDs from your database
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
  ];
}

export default function ResumePreviewPage({ params }: { params: { id: string } }) {
  return <ResumePreview resumeId={params.id} />;
}