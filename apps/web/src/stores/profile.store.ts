'use client';

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type EmploymentStatus = 'employed' | 'self-employed' | 'retired' | 'student' | 'unemployed' | '';
type InvestmentExperience = 'none' | 'beginner' | 'intermediate' | 'advanced' | 'expert' | '';
type RiskTolerance = 'conservative' | 'moderate' | 'aggressive' | 'very-aggressive' | '';
type AnnualIncome = '' | 'under-25k' | '25k-50k' | '50k-100k' | '100k-250k' | '250k-500k' | '500k-plus';
type NetWorth = '' | 'under-50k' | '50k-100k' | '100k-500k' | '500k-1m' | '1m-5m' | '5m-plus';
type InvestmentGoal = 'growth' | 'income' | 'preservation' | 'speculation' | '';

interface ProfileData {
  firstName: string;
  lastName: string;
  phone: string;
  dateOfBirth: string;
  country: string;
  city: string;
  address: string;
  postalCode: string;
  taxId: string;
  employmentStatus: EmploymentStatus;
  employer: string;
  jobTitle: string;
  investmentExperience: InvestmentExperience;
  riskTolerance: RiskTolerance;
  annualIncome: AnnualIncome;
  netWorth: NetWorth;
  investmentGoal: InvestmentGoal;
  sourceOfFunds: string;
}

interface ProfileErrors {
  firstName?: string;
  lastName?: string;
  phone?: string;
  dateOfBirth?: string;
  country?: string;
  taxId?: string;
}

interface ProfileState {
  profile: ProfileData;
  errors: ProfileErrors;
  isSaving: boolean;
  isDirty: boolean;
  lastSaved: string | null;
}

interface ProfileActions {
  updateField: <K extends keyof ProfileData>(field: K, value: ProfileData[K]) => void;
  validate: () => boolean;
  saveProfile: () => Promise<void>;
  resetProfile: () => void;
}

type ProfileStore = ProfileState & ProfileActions;

const EMPTY_PROFILE: ProfileData = {
  firstName: '',
  lastName: '',
  phone: '',
  dateOfBirth: '',
  country: '',
  city: '',
  address: '',
  postalCode: '',
  taxId: '',
  employmentStatus: '',
  employer: '',
  jobTitle: '',
  investmentExperience: '',
  riskTolerance: '',
  annualIncome: '',
  netWorth: '',
  investmentGoal: '',
  sourceOfFunds: '',
};

const initialState: ProfileState = {
  profile: EMPTY_PROFILE,
  errors: {},
  isSaving: false,
  isDirty: false,
  lastSaved: null,
};

function validateProfile(profile: ProfileData): ProfileErrors {
  const errors: ProfileErrors = {};

  if (!profile.firstName.trim()) {
    errors.firstName = 'First name is required';
  }

  if (!profile.lastName.trim()) {
    errors.lastName = 'Last name is required';
  }

  if (profile.phone && !/^\+?[\d\s\-()]{7,20}$/.test(profile.phone)) {
    errors.phone = 'Enter a valid phone number';
  }

  if (profile.dateOfBirth) {
    const dob = new Date(profile.dateOfBirth);
    const now = new Date();
    const age = now.getFullYear() - dob.getFullYear();
    if (age < 18) {
      errors.dateOfBirth = 'You must be at least 18 years old';
    }
  }

  if (profile.taxId && !/^[\w\d\-]{5,20}$/.test(profile.taxId)) {
    errors.taxId = 'Enter a valid tax ID';
  }

  return errors;
}

export const useProfileStore = create<ProfileStore>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        updateField: <K extends keyof ProfileData>(field: K, value: ProfileData[K]): void => {
          set((state) => ({
            profile: { ...state.profile, [field]: value },
            isDirty: true,
            errors: { ...state.errors, [field]: undefined },
          }));
        },

        validate: (): boolean => {
          const errors = validateProfile(get().profile);
          set({ errors });
          return Object.keys(errors).length === 0;
        },

        saveProfile: async (): Promise<void> => {
          const { validate } = get();
          if (!validate()) return;

          set({ isSaving: true });

          // Simulate API call — replace with real endpoint later
          await new Promise((resolve) => setTimeout(resolve, 800));

          set({
            isSaving: false,
            isDirty: false,
            lastSaved: new Date().toISOString(),
          });
        },

        resetProfile: (): void => {
          set(initialState);
        },
      }),
      {
        name: 'braxxis-profile',
        partialize: (state) => ({
          profile: state.profile,
          lastSaved: state.lastSaved,
        }),
      },
    ),
    { name: 'ProfileStore' },
  ),
);

export type { ProfileData, ProfileErrors };
