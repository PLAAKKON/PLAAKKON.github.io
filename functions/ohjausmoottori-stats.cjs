/**
 * Ohjausmoottori — tulos- ja palautetilastot Firestoresta.
 *
 *   cd functions
 *   npm install
 *   gcloud auth application-default login
 *   node ohjausmoottori-stats.cjs
 */
const admin = require('firebase-admin');

const projectId = process.env.FIREBASE_PROJECT_ID || 'urapolku-7781a';

if (!admin.apps.length) {
  admin.initializeApp({ projectId });
}

const db = admin.firestore();

function summarizeFeedback(docs) {
  const counts = { yes: 0, partly: 0, no: 0, total: docs.length };
  const byArchetype = {};
  docs.forEach((doc) => {
    const d = doc.data();
    const rating = d.rating;
    if (counts[rating] !== undefined) counts[rating]++;
    const arch = d.archetype || 'unknown';
    byArchetype[arch] = byArchetype[arch] || { yes: 0, partly: 0, no: 0, total: 0 };
    if (byArchetype[arch][rating] !== undefined) byArchetype[arch][rating]++;
    byArchetype[arch].total++;
  });
  const pct = (n) => (counts.total ? Math.round((n / counts.total) * 100) : 0);
  return {
    counts,
    share: {
      yes: `${pct(counts.yes)}%`,
      partly: `${pct(counts.partly)}%`,
      no: `${pct(counts.no)}%`,
    },
    byArchetype,
  };
}

function summarizeResults(docs) {
  const unique = new Set();
  const byArchetype = {};
  docs.forEach((doc) => {
    const d = doc.data();
    if (d.resultFp) unique.add(d.resultFp);
    const arch = d.archetype || 'unknown';
    byArchetype[arch] = (byArchetype[arch] || 0) + 1;
  });
  return {
    totalEvents: docs.length,
    uniqueResults: unique.size,
    byArchetype,
  };
}

(async () => {
  const [feedbackSnap, resultsSnap] = await Promise.all([
    db.collection('ohjausmoottori_feedback').get(),
    db.collection('ohjausmoottori_results').get(),
  ]);

  const feedback = summarizeFeedback(feedbackSnap.docs);
  const results = summarizeResults(resultsSnap.docs);

  console.log('Ohjausmoottori stats — project:', projectId);
  console.log('');
  console.log('Completed results (ohjausmoottori_results):');
  console.log('  Unique tests logged:', results.uniqueResults);
  console.log('  Total result_view events:', results.totalEvents);
  console.log('  By archetype:', results.byArchetype);
  console.log('');
  console.log('Suitability feedback (ohjausmoottori_feedback):');
  console.log('  Total responses:', feedback.counts.total);
  console.log('  Yes:', feedback.counts.yes, `(${feedback.share.yes})`);
  console.log('  Partly:', feedback.counts.partly, `(${feedback.share.partly})`);
  console.log('  No:', feedback.counts.no, `(${feedback.share.no})`);
  console.log('  By archetype:', feedback.byArchetype);
})().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
