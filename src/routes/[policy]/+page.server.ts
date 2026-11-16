import { error } from '@sveltejs/kit';
import { policies, policyUpdated } from '#lib/content/policies.ts';

export function entries() {
  return policies.map((policy) => ({ policy: policy.slug }));
}

export function load({ params }: { params: { policy: string } }) {
  const policy = policies.find((item) => item.slug === params.policy);
  if (!policy) {
    error(404, 'Policy not found');
  }

  return { policy, updated: policyUpdated };
}
