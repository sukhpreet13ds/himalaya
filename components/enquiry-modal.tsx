'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import {
  faXmark,
  faUsers,
  faUser,
  faUserGroup,
  faPeopleGroup,
  faBuilding,
  faCampground,
  faCalendarDays,
  faLocationDot,
  faPaperPlane,
  faPlus,
  faMinus,
  faCheck,
  faCompass,
  faIndianRupeeSign,
  faWallet,
  faCoins,
  faMoneyBillWave,
  faTag
} from '@fortawesome/free-solid-svg-icons';
import { useCart, GroupType } from './cart-context';
import { packages, whatsappNumber } from '@/lib/packages';

export function EnquiryModal() {
  const { isEnquiryOpen, closeEnquiry, enquiryDestinations } = useCart();

  const [selectedDests, setSelectedDests] = useState<string[]>([]);
  const [groupType, setGroupType] = useState<GroupType>('friends');
  const [membersCount, setMembersCount] = useState<number>(4);
  const [budgetRange, setBudgetRange] = useState<string>('Standard (₹10,000 - ₹18,000)');
  const [travelDates, setTravelDates] = useState<string>('Next Month');
  const [customDates, setCustomDates] = useState<string>('');
  const [departureCity, setDepartureCity] = useState<string>('Delhi NCR');
  const [customCity, setCustomCity] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  // Sync selected destinations when modal opens
  useEffect(() => {
    if (enquiryDestinations.length > 0) {
      setSelectedDests(enquiryDestinations);
    } else {
      setSelectedDests([packages[0].name]);
    }
  }, [enquiryDestinations, isEnquiryOpen]);

  // Adjust default member count based on group type
  const handleGroupTypeChange = (type: GroupType) => {
    setGroupType(type);
    if (type === 'solo') setMembersCount(1);
    else if (type === 'couple') setMembersCount(2);
    else if (type === 'friends') setMembersCount(4);
    else if (type === 'family') setMembersCount(4);
    else if (type === 'group') setMembersCount(8);
  };

  // Group options with FontAwesome icons ONLY
  const groupOptions = [
    { type: 'solo' as GroupType, label: 'Solo Traveler', desc: '1 Person', icon: faUser },
    { type: 'couple' as GroupType, label: 'Couple', desc: '2 Travelers', icon: faUserGroup },
    { type: 'friends' as GroupType, label: 'Friends', desc: '3-6 Group', icon: faCampground },
    { type: 'family' as GroupType, label: 'Family', desc: 'Kids & Elders', icon: faPeopleGroup },
    { type: 'group' as GroupType, label: 'Corporate / Group', desc: '7+ Travelers', icon: faBuilding }
  ];

  // Budget Range Options with FontAwesome icons ONLY
  const budgetOptions = [
    { label: 'Pocket Friendly', range: '₹5,000 - ₹10,000 / person', icon: faWallet },
    { label: 'Standard / Comfort', range: '₹10,000 - ₹18,000 / person', icon: faCoins },
    { label: 'Premium / Deluxe', range: '₹18,000 - ₹28,000 / person', icon: faIndianRupeeSign },
    { label: 'Luxury Experience', range: '₹28,000+ / person', icon: faMoneyBillWave },
    { label: 'Flexible', range: 'Discuss on WhatsApp', icon: faTag }
  ];

  const quickDates = ['Next Weekend', 'This Month', 'Next Month', 'Long Weekend', 'Flexible'];
  const quickCities = ['Delhi NCR', 'Chandigarh', 'Jaipur', 'Mumbai', 'Other'];

  const toggleDestination = (destName: string) => {
    setSelectedDests((prev) =>
      prev.includes(destName)
        ? prev.length > 1
          ? prev.filter((d) => d !== destName)
          : prev // keep at least 1
        : [...prev, destName]
    );
  };

  // Check if this inquiry is for a single package or multi-package
  const isSinglePackage = selectedDests.length === 1;
  const targetPackage = isSinglePackage
    ? packages.find((p) => p.name.toLowerCase() === selectedDests[0].toLowerCase())
    : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Please enter your name.');
      return;
    }
    if (!phone.trim() || phone.trim().length < 8) {
      setErrorMsg('Please provide a valid phone/WhatsApp number.');
      return;
    }

    const finalDates = travelDates === 'Custom' ? customDates : travelDates;
    const finalCity = departureCity === 'Other' ? (customCity || 'Other City') : departureCity;
    const destString = selectedDests.join(', ');

    const groupLabel =
      groupOptions.find((g) => g.type === groupType)?.label || groupType;

    // Package-wise customized message formatting
    let messageHeader = '🏔️ *HimalayaHikes Trip Enquiry*';
    let packageInfoLine = `📍 *Selected Destination(s):* ${destString}`;

    if (isSinglePackage && targetPackage) {
      messageHeader = `🏔️ *HimalayaHikes Package Enquiry: ${targetPackage.name}*`;
      packageInfoLine = `📍 *Package:* ${targetPackage.name} (${targetPackage.duration || 'Custom'}, ${targetPackage.region})`;
    } else if (selectedDests.length > 1) {
      messageHeader = `🏔️ *HimalayaHikes Multi-Package Enquiry (${selectedDests.length} Destinations)*`;
      packageInfoLine = `📍 *Selected Packages:* ${destString}`;
    }

    const message = [
      messageHeader,
      '---------------------------------------',
      packageInfoLine,
      `👥 *Plan Members:* ${groupLabel} (${membersCount} ${membersCount === 1 ? 'Traveler' : 'Travelers'})`,
      `💰 *Budget Range:* ${budgetRange}`,
      `📅 *Travel Dates / Timing:* ${finalDates || 'Upcoming'}`,
      `🚗 *Departure / Starting City:* ${finalCity}`,
      `👤 *Customer Name:* ${name.trim()}`,
      `📱 *WhatsApp Contact:* ${phone.trim()}`,
      notes.trim() ? `💬 *Preferences / Notes:* ${notes.trim()}` : '',
      '---------------------------------------',
      isSinglePackage && targetPackage
        ? `Please share the day-wise itinerary, inclusions, and best quote for ${targetPackage.name}!`
        : 'Please share available dates, full detailed itinerary, and best pricing!'
    ]
      .filter(Boolean)
      .join('\n');

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    closeEnquiry();
  };

  return (
    <AnimatePresence>
      {isEnquiryOpen && (
        <div className="enquiry-modal-backdrop" onClick={closeEnquiry}>
          <motion.div
            className="enquiry-modal-box"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.22 }}
            onClick={(e) => e.stopPropagation()}
            aria-label="Trip Enquiry & Member Details"
          >
            {/* Modal Header */}
            <div className="enquiry-modal-header">
              <div className="enquiry-modal-title-group">
               
                <h3>
                  {isSinglePackage && targetPackage ? `Plan Your ${targetPackage.name} Trip` : 'Plan Your Custom Adventure'}
                </h3>
                <p>
                  Share your plan members & budget range to receive immediate itinerary details and customized quotes on WhatsApp.
                </p>
              </div>
              <button
                type="button"
                className="enquiry-modal-close"
                onClick={closeEnquiry}
                aria-label="Close modal"
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="enquiry-modal-body">
              {errorMsg && <div className="enquiry-error-banner">{errorMsg}</div>}

              {/* STEP 1: Destinations */}
              <div className="enquiry-field-section">
                <label className="enquiry-section-label">
                  <span className="enquiry-step-num">1</span>
                  <span>Destination Package</span>
                </label>
                <div className="enquiry-dest-pills">
                  {packages.map((pkg) => {
                    const isSelected = selectedDests.includes(pkg.name);
                    return (
                      <button
                        key={pkg.slug}
                        type="button"
                        onClick={() => toggleDestination(pkg.name)}
                        className={`enquiry-dest-pill ${isSelected ? 'selected' : ''}`}
                      >
                        {isSelected && <FontAwesomeIcon icon={faCheck} className="mr-1.5 text-xs" />}
                        <span>{pkg.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* STEP 2: Plan Members (Group Type & Member Count) - FontAwesome Icons Only */}
              <div className="enquiry-field-section">
                <label className="enquiry-section-label">
                  <span className="enquiry-step-num">2</span>
                  <span>Who is Traveling? (Plan Members)</span>
                </label>
                <div className="enquiry-group-grid">
                  {groupOptions.map((opt) => (
                    <button
                      key={opt.type}
                      type="button"
                      onClick={() => handleGroupTypeChange(opt.type)}
                      className={`enquiry-group-card ${groupType === opt.type ? 'active' : ''}`}
                    >
                      <span className="enquiry-group-icon-wrap">
                        <FontAwesomeIcon icon={opt.icon} className="enquiry-group-fa-icon" />
                      </span>
                      <strong className="enquiry-group-title">{opt.label}</strong>
                      <span className="enquiry-group-desc">{opt.desc}</span>
                    </button>
                  ))}
                </div>

                {/* Member Counter Stepper */}
                <div className="enquiry-members-counter">
                  <div className="counter-label">
                    <FontAwesomeIcon icon={faUsers} className="text-orange-500" />
                    <span>Exact Number of Travelers:</span>
                  </div>
                  <div className="counter-control">
                    <button
                      type="button"
                      onClick={() => setMembersCount((prev) => Math.max(1, prev - 1))}
                      className="counter-btn"
                      aria-label="Decrease members"
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <span className="counter-value">{membersCount} {membersCount === 1 ? 'Person' : 'Members'}</span>
                    <button
                      type="button"
                      onClick={() => setMembersCount((prev) => prev + 1)}
                      className="counter-btn"
                      aria-label="Increase members"
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>
                </div>
              </div>

              {/* STEP 3: Budget Range Option - FontAwesome Icons Only */}
              <div className="enquiry-field-section">
                <label className="enquiry-section-label">
                  <span className="enquiry-step-num">3</span>
                  <span>Budget Range (Per Person)</span>
                </label>
                <div className="enquiry-budget-grid">
                  {budgetOptions.map((b) => {
                    const isSelected = budgetRange.includes(b.label) || budgetRange === b.range;
                    return (
                      <button
                        key={b.label}
                        type="button"
                        onClick={() => setBudgetRange(`${b.label} (${b.range})`)}
                        className={`enquiry-budget-card ${isSelected ? 'active' : ''}`}
                      >
                        <div className="enquiry-budget-header">
                          <FontAwesomeIcon icon={b.icon} className="enquiry-budget-icon" />
                          <span className="enquiry-budget-title">{b.label}</span>
                        </div>
                        <span className="enquiry-budget-range">{b.range}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* STEP 4: Travel Timing & Starting City */}
              <div className="enquiry-field-section">
                <div className="enquiry-two-col">
                  {/* Timing */}
                  <div>
                    <label className="enquiry-section-label">
                      <span className="enquiry-step-num">4</span>
                      <span>Tentative Dates / Timing</span>
                    </label>
                    <div className="enquiry-quick-chips">
                      {quickDates.map((d) => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => setTravelDates(d)}
                          className={`enquiry-chip ${travelDates === d ? 'active' : ''}`}
                        >
                          <FontAwesomeIcon icon={faCalendarDays} className="mr-1 text-xs text-orange-400" />
                          <span>{d}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Departure City */}
                  <div>
                    <label className="enquiry-section-label">
                      <span className="enquiry-step-num">5</span>
                      <span>Starting / Departure City</span>
                    </label>
                    <div className="enquiry-quick-chips">
                      {quickCities.map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setDepartureCity(c)}
                          className={`enquiry-chip ${departureCity === c ? 'active' : ''}`}
                        >
                          <FontAwesomeIcon icon={faLocationDot} className="mr-1 text-xs text-orange-400" />
                          <span>{c}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* STEP 5: Customer Contact Details */}
              <div className="enquiry-field-section">
                <label className="enquiry-section-label">
                  <span className="enquiry-step-num">6</span>
                  <span>Your Contact Details</span>
                </label>
                <div className="enquiry-contact-grid">
                  <div className="enquiry-input-wrap">
                    <label>
                      Your Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="input-with-icon">
                      <FontAwesomeIcon icon={faUser} className="input-icon" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          setErrorMsg('');
                        }}
                        placeholder="e.g. Rahul Sharma"
                        required
                      />
                    </div>
                  </div>

                  <div className="enquiry-input-wrap">
                    <label>
                      WhatsApp / Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="input-with-icon">
                      <FontAwesomeIcon icon={faWhatsapp} className="input-icon text-green-500" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          setErrorMsg('');
                        }}
                        placeholder="e.g. 98765 43210"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="enquiry-input-wrap mt-3">
                  <label>Trip Preferences / Special Wishes (Optional)</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Need river camp, trekking guide, vegetarian food, or customized duration..."
                    rows={2}
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="enquiry-submit-row">
                <button type="submit" className="button button-orange enquiry-submit-btn">
                  <FontAwesomeIcon icon={faWhatsapp} className="fa-lg text-green-400" />
                  <span>
                    {isSinglePackage && targetPackage
                      ? `Enquire for ${targetPackage.name} on WhatsApp`
                      : 'Send Enquiry to WhatsApp (+91 93540 97831)'}
                  </span>
                  <FontAwesomeIcon icon={faPaperPlane} className="text-sm ml-1" />
                </button>
                <small className="enquiry-privacy-note">
                  <FontAwesomeIcon icon={faCompass} className="mr-1 text-orange-400" />
                  We connect you directly with a Himalayan specialist. No spam, immediate replies.
                </small>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
