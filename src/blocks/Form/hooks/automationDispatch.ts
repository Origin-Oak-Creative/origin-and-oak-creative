import { CollectionAfterChangeHook } from 'payload';
import { runFormAutomations } from '../automations';

export const automationDispatcher: CollectionAfterChangeHook = async ({ doc, req, operation }) => {
  if (operation !== 'create') return;

  const { payload } = req;

  // Fetch the full form object including automation settings
  const form = await payload.findByID({
    collection: 'forms',
    id: typeof doc.form === 'object' ? doc.form.id : doc.form,
  });

  // This function handles the "if/else" logic for every service
  void runFormAutomations(form, doc, payload);
};
