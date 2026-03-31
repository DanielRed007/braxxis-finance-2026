import { Entity } from '../base/entity.js';
import { UserId } from '../auth/user-id.js';

export type EmploymentStatus = 'employed' | 'self-employed' | 'retired' | 'student' | 'unemployed' | '';
export type InvestmentExperience = 'none' | 'beginner' | 'intermediate' | 'advanced' | 'expert' | '';
export type RiskTolerance = 'conservative' | 'moderate' | 'aggressive' | 'very-aggressive' | '';
export type AnnualIncome = '' | 'under-25k' | '25k-50k' | '50k-100k' | '100k-250k' | '250k-500k' | '500k-plus';
export type NetWorth = '' | 'under-50k' | '50k-100k' | '100k-500k' | '500k-1m' | '1m-5m' | '5m-plus';
export type InvestmentGoal = 'growth' | 'income' | 'preservation' | 'speculation' | '';

export interface ProfileProps {
  userId: UserId;
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
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProfileProps {
  userId: UserId;
  firstName: string;
  lastName: string;
  phone?: string;
  dateOfBirth?: string;
  country?: string;
  city?: string;
  address?: string;
  postalCode?: string;
  taxId?: string;
  employmentStatus?: EmploymentStatus;
  employer?: string;
  jobTitle?: string;
  investmentExperience?: InvestmentExperience;
  riskTolerance?: RiskTolerance;
  annualIncome?: AnnualIncome;
  netWorth?: NetWorth;
  investmentGoal?: InvestmentGoal;
  sourceOfFunds?: string;
}

export class Profile extends Entity<UserId> {
  private _firstName: string;
  private _lastName: string;
  private _phone: string;
  private _dateOfBirth: string;
  private _country: string;
  private _city: string;
  private _address: string;
  private _postalCode: string;
  private _taxId: string;
  private _employmentStatus: EmploymentStatus;
  private _employer: string;
  private _jobTitle: string;
  private _investmentExperience: InvestmentExperience;
  private _riskTolerance: RiskTolerance;
  private _annualIncome: AnnualIncome;
  private _netWorth: NetWorth;
  private _investmentGoal: InvestmentGoal;
  private _sourceOfFunds: string;
  private _createdAt: Date;
  private _updatedAt: Date;

  private constructor(props: ProfileProps) {
    super(props.userId);
    this._firstName = props.firstName;
    this._lastName = props.lastName;
    this._phone = props.phone;
    this._dateOfBirth = props.dateOfBirth;
    this._country = props.country;
    this._city = props.city;
    this._address = props.address;
    this._postalCode = props.postalCode;
    this._taxId = props.taxId;
    this._employmentStatus = props.employmentStatus;
    this._employer = props.employer;
    this._jobTitle = props.jobTitle;
    this._investmentExperience = props.investmentExperience;
    this._riskTolerance = props.riskTolerance;
    this._annualIncome = props.annualIncome;
    this._netWorth = props.netWorth;
    this._investmentGoal = props.investmentGoal;
    this._sourceOfFunds = props.sourceOfFunds;
    this._createdAt = props.createdAt;
    this._updatedAt = props.updatedAt;
  }

  static create(props: CreateProfileProps): Profile {
    const now = new Date();
    return new Profile({
      userId: props.userId,
      firstName: props.firstName,
      lastName: props.lastName,
      phone: props.phone ?? '',
      dateOfBirth: props.dateOfBirth ?? '',
      country: props.country ?? '',
      city: props.city ?? '',
      address: props.address ?? '',
      postalCode: props.postalCode ?? '',
      taxId: props.taxId ?? '',
      employmentStatus: props.employmentStatus ?? '',
      employer: props.employer ?? '',
      jobTitle: props.jobTitle ?? '',
      investmentExperience: props.investmentExperience ?? '',
      riskTolerance: props.riskTolerance ?? '',
      annualIncome: props.annualIncome ?? '',
      netWorth: props.netWorth ?? '',
      investmentGoal: props.investmentGoal ?? '',
      sourceOfFunds: props.sourceOfFunds ?? '',
      createdAt: now,
      updatedAt: now,
    });
  }

  static reconstitute(props: ProfileProps): Profile {
    return new Profile(props);
  }

  update(props: Partial<CreateProfileProps>): void {
    if (props.firstName !== undefined) this._firstName = props.firstName;
    if (props.lastName !== undefined) this._lastName = props.lastName;
    if (props.phone !== undefined) this._phone = props.phone;
    if (props.dateOfBirth !== undefined) this._dateOfBirth = props.dateOfBirth;
    if (props.country !== undefined) this._country = props.country;
    if (props.city !== undefined) this._city = props.city;
    if (props.address !== undefined) this._address = props.address;
    if (props.postalCode !== undefined) this._postalCode = props.postalCode;
    if (props.taxId !== undefined) this._taxId = props.taxId;
    if (props.employmentStatus !== undefined) this._employmentStatus = props.employmentStatus;
    if (props.employer !== undefined) this._employer = props.employer;
    if (props.jobTitle !== undefined) this._jobTitle = props.jobTitle;
    if (props.investmentExperience !== undefined) this._investmentExperience = props.investmentExperience;
    if (props.riskTolerance !== undefined) this._riskTolerance = props.riskTolerance;
    if (props.annualIncome !== undefined) this._annualIncome = props.annualIncome;
    if (props.netWorth !== undefined) this._netWorth = props.netWorth;
    if (props.investmentGoal !== undefined) this._investmentGoal = props.investmentGoal;
    if (props.sourceOfFunds !== undefined) this._sourceOfFunds = props.sourceOfFunds;
    this._updatedAt = new Date();
  }

  get firstName(): string { return this._firstName; }
  get lastName(): string { return this._lastName; }
  get phone(): string { return this._phone; }
  get dateOfBirth(): string { return this._dateOfBirth; }
  get country(): string { return this._country; }
  get city(): string { return this._city; }
  get address(): string { return this._address; }
  get postalCode(): string { return this._postalCode; }
  get taxId(): string { return this._taxId; }
  get employmentStatus(): EmploymentStatus { return this._employmentStatus; }
  get employer(): string { return this._employer; }
  get jobTitle(): string { return this._jobTitle; }
  get investmentExperience(): InvestmentExperience { return this._investmentExperience; }
  get riskTolerance(): RiskTolerance { return this._riskTolerance; }
  get annualIncome(): AnnualIncome { return this._annualIncome; }
  get netWorth(): NetWorth { return this._netWorth; }
  get investmentGoal(): InvestmentGoal { return this._investmentGoal; }
  get sourceOfFunds(): string { return this._sourceOfFunds; }
  get createdAt(): Date { return this._createdAt; }
  get updatedAt(): Date { return this._updatedAt; }
}
