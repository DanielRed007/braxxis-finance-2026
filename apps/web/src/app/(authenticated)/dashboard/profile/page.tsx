'use client';

import type { ReactNode } from 'react';
import { useProfileStore } from '@/stores/profile.store';
import type { ProfileData } from '@/stores/profile.store';
import { GradientText } from '@/components/ui/gradient-text';

function Field({
  label,
  field,
  type = 'text',
  placeholder,
  error,
  value,
  onChange,
}: {
  label: string;
  field: string;
  type?: string;
  placeholder?: string;
  error?: string;
  value: string;
  onChange: (value: string) => void;
}): ReactNode {
  return (
    <label className="flex flex-col gap-1.5">
      <span
        className="text-xs font-medium uppercase tracking-widest"
        style={{ color: 'var(--color-text-muted)' }}
      >
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-purple-accent/40"
        style={{
          color: 'var(--color-text-primary)',
          background: 'var(--color-input-bg)',
          border: error ? '1px solid #f87171' : '1px solid var(--color-border-card)',
        }}
        id={field}
      />
      {error && (
        <span className="text-xs" style={{ color: '#f87171' }}>{error}</span>
      )}
    </label>
  );
}

function SelectField({
  label,
  field,
  options,
  error,
  value,
  onChange,
}: {
  label: string;
  field: string;
  options: { value: string; label: string }[];
  error?: string;
  value: string;
  onChange: (value: string) => void;
}): ReactNode {
  return (
    <label className="flex flex-col gap-1.5">
      <span
        className="text-xs font-medium uppercase tracking-widest"
        style={{ color: 'var(--color-text-muted)' }}
      >
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-purple-accent/40 appearance-none cursor-pointer"
        style={{
          color: value ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
          background: 'var(--color-input-bg)',
          border: error ? '1px solid #f87171' : '1px solid var(--color-border-card)',
        }}
        id={field}
      >
        <option value="">Select...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && (
        <span className="text-xs" style={{ color: '#f87171' }}>{error}</span>
      )}
    </label>
  );
}

function SectionCard({ title, description, children }: { title: string; description: string; children: ReactNode }): ReactNode {
  return (
    <div
      className="p-6 rounded-2xl mb-4"
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border-card)',
      }}
    >
      <h2 className="font-semibold mb-1" style={{ color: 'var(--color-text-primary)' }}>
        {title}
      </h2>
      <p className="text-sm mb-6" style={{ color: 'var(--color-text-muted)' }}>
        {description}
      </p>
      {children}
    </div>
  );
}

const EMPLOYMENT_OPTIONS = [
  { value: 'employed', label: 'Employed' },
  { value: 'self-employed', label: 'Self-Employed' },
  { value: 'retired', label: 'Retired' },
  { value: 'student', label: 'Student' },
  { value: 'unemployed', label: 'Unemployed' },
];

const EXPERIENCE_OPTIONS = [
  { value: 'none', label: 'None' },
  { value: 'beginner', label: 'Beginner (< 1 year)' },
  { value: 'intermediate', label: 'Intermediate (1–3 years)' },
  { value: 'advanced', label: 'Advanced (3–10 years)' },
  { value: 'expert', label: 'Expert (10+ years)' },
];

const RISK_OPTIONS = [
  { value: 'conservative', label: 'Conservative — Preserve capital' },
  { value: 'moderate', label: 'Moderate — Balanced growth' },
  { value: 'aggressive', label: 'Aggressive — High growth' },
  { value: 'very-aggressive', label: 'Very Aggressive — Maximum returns' },
];

const INCOME_OPTIONS = [
  { value: 'under-25k', label: 'Under $25,000' },
  { value: '25k-50k', label: '$25,000 – $50,000' },
  { value: '50k-100k', label: '$50,000 – $100,000' },
  { value: '100k-250k', label: '$100,000 – $250,000' },
  { value: '250k-500k', label: '$250,000 – $500,000' },
  { value: '500k-plus', label: '$500,000+' },
];

const NET_WORTH_OPTIONS = [
  { value: 'under-50k', label: 'Under $50,000' },
  { value: '50k-100k', label: '$50,000 – $100,000' },
  { value: '100k-500k', label: '$100,000 – $500,000' },
  { value: '500k-1m', label: '$500,000 – $1M' },
  { value: '1m-5m', label: '$1M – $5M' },
  { value: '5m-plus', label: '$5M+' },
];

const GOAL_OPTIONS = [
  { value: 'growth', label: 'Long-term growth' },
  { value: 'income', label: 'Generate income' },
  { value: 'preservation', label: 'Capital preservation' },
  { value: 'speculation', label: 'Speculation / Trading' },
];

export default function ProfilePage(): ReactNode {
  const profile = useProfileStore((s) => s.profile);
  const errors = useProfileStore((s) => s.errors);
  const isSaving = useProfileStore((s) => s.isSaving);
  const isDirty = useProfileStore((s) => s.isDirty);
  const lastSaved = useProfileStore((s) => s.lastSaved);
  const updateField = useProfileStore((s) => s.updateField);
  const saveProfile = useProfileStore((s) => s.saveProfile);

  function handleChange<K extends keyof ProfileData>(field: K) {
    return (value: string) => updateField(field, value as ProfileData[K]);
  }

  return (
    <div className="max-w-3xl">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-1">
            <GradientText>Profile</GradientText>
          </h1>
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            Complete your investor profile for regulatory compliance and personalized recommendations.
          </p>
        </div>
        {lastSaved && (
          <span className="text-xs shrink-0 mt-2" style={{ color: 'var(--color-text-muted)' }}>
            Last saved {new Date(lastSaved).toLocaleDateString()}
          </span>
        )}
      </div>

      {/* Personal Information */}
      <SectionCard title="Personal Information" description="Your legal name and contact details.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field
            label="First Name"
            field="firstName"
            placeholder="John"
            value={profile.firstName}
            onChange={handleChange('firstName')}
            error={errors.firstName}
          />
          <Field
            label="Last Name"
            field="lastName"
            placeholder="Doe"
            value={profile.lastName}
            onChange={handleChange('lastName')}
            error={errors.lastName}
          />
          <Field
            label="Phone Number"
            field="phone"
            type="tel"
            placeholder="+1 (555) 000-0000"
            value={profile.phone}
            onChange={handleChange('phone')}
            error={errors.phone}
          />
          <Field
            label="Date of Birth"
            field="dateOfBirth"
            type="date"
            value={profile.dateOfBirth}
            onChange={handleChange('dateOfBirth')}
            error={errors.dateOfBirth}
          />
        </div>
      </SectionCard>

      {/* Address */}
      <SectionCard title="Residential Address" description="Used for tax reporting and account verification.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field
            label="Country"
            field="country"
            placeholder="United States"
            value={profile.country}
            onChange={handleChange('country')}
            error={errors.country}
          />
          <Field
            label="City"
            field="city"
            placeholder="New York"
            value={profile.city}
            onChange={handleChange('city')}
          />
          <div className="md:col-span-2">
            <Field
              label="Street Address"
              field="address"
              placeholder="123 Wall Street, Apt 4B"
              value={profile.address}
              onChange={handleChange('address')}
            />
          </div>
          <Field
            label="Postal Code"
            field="postalCode"
            placeholder="10005"
            value={profile.postalCode}
            onChange={handleChange('postalCode')}
          />
          <Field
            label="Tax ID / SSN"
            field="taxId"
            placeholder="XXX-XX-XXXX"
            value={profile.taxId}
            onChange={handleChange('taxId')}
            error={errors.taxId}
          />
        </div>
      </SectionCard>

      {/* Employment */}
      <SectionCard title="Employment" description="Required for regulatory and KYC compliance.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectField
            label="Employment Status"
            field="employmentStatus"
            options={EMPLOYMENT_OPTIONS}
            value={profile.employmentStatus}
            onChange={handleChange('employmentStatus')}
          />
          <Field
            label="Employer"
            field="employer"
            placeholder="Company name"
            value={profile.employer}
            onChange={handleChange('employer')}
          />
          <Field
            label="Job Title"
            field="jobTitle"
            placeholder="Software Engineer"
            value={profile.jobTitle}
            onChange={handleChange('jobTitle')}
          />
        </div>
      </SectionCard>

      {/* Investment Profile */}
      <SectionCard title="Investment Profile" description="Helps us tailor recommendations to your goals and experience.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectField
            label="Investment Experience"
            field="investmentExperience"
            options={EXPERIENCE_OPTIONS}
            value={profile.investmentExperience}
            onChange={handleChange('investmentExperience')}
          />
          <SelectField
            label="Risk Tolerance"
            field="riskTolerance"
            options={RISK_OPTIONS}
            value={profile.riskTolerance}
            onChange={handleChange('riskTolerance')}
          />
          <SelectField
            label="Annual Income"
            field="annualIncome"
            options={INCOME_OPTIONS}
            value={profile.annualIncome}
            onChange={handleChange('annualIncome')}
          />
          <SelectField
            label="Estimated Net Worth"
            field="netWorth"
            options={NET_WORTH_OPTIONS}
            value={profile.netWorth}
            onChange={handleChange('netWorth')}
          />
          <SelectField
            label="Investment Goal"
            field="investmentGoal"
            options={GOAL_OPTIONS}
            value={profile.investmentGoal}
            onChange={handleChange('investmentGoal')}
          />
          <Field
            label="Source of Funds"
            field="sourceOfFunds"
            placeholder="Salary, savings, inheritance..."
            value={profile.sourceOfFunds}
            onChange={handleChange('sourceOfFunds')}
          />
        </div>
      </SectionCard>

      {/* Save button */}
      <div className="flex items-center justify-between mt-2 mb-8">
        <div>
          {isDirty && (
            <span className="text-xs" style={{ color: 'var(--color-purple-light)' }}>
              You have unsaved changes
            </span>
          )}
        </div>
        <button
          onClick={saveProfile}
          disabled={isSaving || !isDirty}
          className="px-8 py-3 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:brightness-90 hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          style={{ background: 'var(--color-purple-primary)' }}
        >
          {isSaving ? 'Saving...' : 'Save Profile'}
        </button>
      </div>
    </div>
  );
}
