'use client';

import { useState } from 'react';
import * as z from 'zod';
import { toast } from 'sonner';
import PageContainer from '@/components/layout/page-container';
import { useAppForm } from '@/lib/form';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { FieldGroup } from '@/components/ui/field';
import { UserAvatarProfile } from '@/components/user-avatar-profile';
import { accountHolder } from '@/constants/mock-api-annuity';

const personalInfoSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.email('Enter a valid email address'),
  phone: z.string().min(10, 'Enter a valid phone number'),
  dateOfBirth: z.date(),
  addressLine1: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(2, 'State is required').max(2, 'Use a 2-letter abbreviation'),
  zip: z.string().min(5, 'Enter a valid ZIP code')
});

export default function ProfileViewPage() {
  const [holder, setHolder] = useState(accountHolder);

  const form = useAppForm({
    defaultValues: {
      firstName: holder.firstName,
      lastName: holder.lastName,
      email: holder.email,
      phone: holder.phone,
      dateOfBirth: new Date(holder.dateOfBirth),
      addressLine1: holder.addressLine1,
      city: holder.city,
      state: holder.state,
      zip: holder.zip
    },
    validators: {
      onSubmit: personalInfoSchema
    },
    onSubmit: ({ value }) => {
      setHolder({
        ...value,
        dateOfBirth: value.dateOfBirth?.toISOString().slice(0, 10) ?? holder.dateOfBirth
      });
      toast.success('Profile updated');
    }
  });

  const preferencesForm = useAppForm({
    defaultValues: {
      paperlessStatements: true,
      paymentAlerts: true,
      smsReminders: false
    },
    onSubmit: () => {
      toast.success('Preferences saved');
    }
  });

  const displayUser = {
    imageUrl: '',
    fullName: `${holder.firstName} ${holder.lastName}`,
    emailAddresses: [{ emailAddress: holder.email }]
  };

  return (
    <PageContainer
      pageTitle='Profile'
      pageDescription='Manage your personal information and preferences'
    >
      <div className='flex flex-col gap-4'>
        <Card>
          <CardContent className='flex items-center gap-4'>
            <UserAvatarProfile user={displayUser} className='h-16 w-16 rounded-full' />
            <div>
              <div className='text-lg font-semibold'>{displayUser.fullName}</div>
              <div className='text-muted-foreground text-sm'>{holder.email}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your contact details and mailing address</CardDescription>
          </CardHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <CardContent>
              <FieldGroup className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <form.AppField
                  name='firstName'
                  children={(field) => <field.TextField label='First name' required />}
                />
                <form.AppField
                  name='lastName'
                  children={(field) => <field.TextField label='Last name' required />}
                />
                <form.AppField
                  name='email'
                  children={(field) => <field.TextField label='Email' required type='email' />}
                />
                <form.AppField
                  name='phone'
                  children={(field) => <field.TextField label='Phone' required type='tel' />}
                />
                <form.AppField
                  name='dateOfBirth'
                  children={(field) => (
                    <field.DatePickerField
                      label='Date of birth'
                      disabledDates={(date) => date > new Date()}
                    />
                  )}
                />
                <form.AppField
                  name='addressLine1'
                  children={(field) => <field.TextField label='Mailing address' required />}
                />
                <form.AppField
                  name='city'
                  children={(field) => <field.TextField label='City' required />}
                />
                <div className='grid grid-cols-2 gap-4'>
                  <form.AppField
                    name='state'
                    children={(field) => (
                      <field.TextField label='State' required placeholder='MI' />
                    )}
                  />
                  <form.AppField
                    name='zip'
                    children={(field) => <field.TextField label='ZIP code' required />}
                  />
                </div>
              </FieldGroup>
            </CardContent>
            <CardFooter>
              <form.AppForm>
                <form.SubmitButton>Save changes</form.SubmitButton>
              </form.AppForm>
            </CardFooter>
          </form>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Communication Preferences</CardTitle>
            <CardDescription>Choose how we keep you updated</CardDescription>
          </CardHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              preferencesForm.handleSubmit();
            }}
          >
            <CardContent className='flex flex-col gap-4'>
              <preferencesForm.AppField
                name='paperlessStatements'
                children={(field) => (
                  <field.SwitchField
                    label='Paperless statements'
                    description='Get statements by email instead of mail'
                  />
                )}
              />
              <preferencesForm.AppField
                name='paymentAlerts'
                children={(field) => (
                  <field.SwitchField
                    label='Payment deposit alerts'
                    description='Notify me when a guaranteed income payment is deposited'
                  />
                )}
              />
              <preferencesForm.AppField
                name='smsReminders'
                children={(field) => (
                  <field.SwitchField
                    label='SMS reminders'
                    description='Text me reminders about upcoming payments and reviews'
                  />
                )}
              />
            </CardContent>
            <CardFooter>
              <preferencesForm.AppForm>
                <preferencesForm.SubmitButton>Save preferences</preferencesForm.SubmitButton>
              </preferencesForm.AppForm>
            </CardFooter>
          </form>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security</CardTitle>
            <CardDescription>Account access is disabled in this demo deployment</CardDescription>
          </CardHeader>
          <CardContent className='text-muted-foreground text-sm'>
            Sign-in and password management use Clerk in the full version of this app.
          </CardContent>
          <CardFooter>
            <Button variant='outline' disabled>
              Change password
            </Button>
          </CardFooter>
        </Card>
      </div>
    </PageContainer>
  );
}
