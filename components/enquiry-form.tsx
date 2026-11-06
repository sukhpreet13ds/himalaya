'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare, faIndianRupeeSign, faUsers } from '@fortawesome/free-solid-svg-icons';
import { packages, whatsappNumber } from '@/lib/packages';
import { WhatsAppIcon } from './ui';

export function EnquiryForm() {
  const [name, setName] = useState('');
  const [destination, setDestination] = useState('');
  const [planMembers, setPlanMembers] = useState('Friends (3-6 Travelers)');
  const [memberCount, setMemberCount] = useState('4');
  const [budgetRange, setBudgetRange] = useState('Standard (₹10k - ₹18k / person)');
  const [message, setMessage] = useState('');

  const groupOptions = [
    'Solo (1 Traveler)',
    'Couple (2 Travelers)',
    'Friends (3-6 Travelers)',
    'Family (With Kids/Elders)',
    'Corporate / College Group (7+ Travelers)'
  ];

  const budgetOptions = [
    'Pocket Friendly (₹5k - ₹10k / person)',
    'Standard (₹10k - ₹18k / person)',
    'Premium Deluxe (₹18k - ₹28k / person)',
    'Luxury Experience (₹28k+ / person)',
    'Flexible / Open Budget'
  ];

  return (
    <form
      className="enquiry-form"
      action={`https://wa.me/${whatsappNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      method="get"
    >
      <h2>Let's plan something wonderful.</h2>
      <p>Tell us your group size, budget & travel details for instant WhatsApp itineraries.</p>

      <label>
        Your Name
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="What should we call you?"
          autoComplete="name"
          required
          maxLength={100}
        />
      </label>

      <label>
        Preferred Destination
        <select
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          required
        >
          <option value="">Where would you like to go?</option>
          {packages.map((p) => (
            <option key={p.slug} value={p.name}>
              {p.name} ({p.region})
            </option>
          ))}
        </select>
      </label>

      <div className="enquiry-form-row">
        <label>
          Plan Members (Who is Traveling?)
          <select
            value={planMembers}
            onChange={(e) => setPlanMembers(e.target.value)}
          >
            {groupOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </label>

        <label>
          Exact Number of Travelers
          <input
            type="number"
            min="1"
            max="50"
            value={memberCount}
            onChange={(e) => setMemberCount(e.target.value)}
            placeholder="e.g. 4"
            required
          />
        </label>
      </div>

      <label>
        Budget Range (Per Person)
        <select
          value={budgetRange}
          onChange={(e) => setBudgetRange(e.target.value)}
        >
          {budgetOptions.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </label>

      <label>
        Your Travel Ideas <span>(optional)</span>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tentative travel month, departure city, or any custom requests..."
          rows={3}
          maxLength={2000}
        />
      </label>

      <input
        type="hidden"
        name="text"
        value={`Hello HimalayaHikes, I'm ${name}. I want details about ${destination}. Plan Members: ${planMembers} (${memberCount} travelers). Budget: ${budgetRange}.${
          message ? ` Note: ${message}` : ''
        }`}
      />

      <button type="submit" className="button button-orange enquiry-submit-btn">
        <WhatsAppIcon />
        <span>Continue on WhatsApp</span>
        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
      </button>

      <small>Direct WhatsApp chat (+91 93540 97831) with your prefilled details.</small>
    </form>
  );
}
