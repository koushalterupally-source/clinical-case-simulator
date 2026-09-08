import { CaseScaffold } from '../../types';

/**
 * A chronic, antibody-mediated intraepidermal blistering disease — deliberately
 * NOT a rebuild of the TEN case. Where TEN is acute (days), drug-triggered, and
 * splits the skin subepidermally as a single catastrophic event, this case is
 * subacute (weeks), autoimmune with no drug trigger, and splits the skin WITHIN
 * the epidermis (suprabasal acantholysis) — flaccid, easily-ruptured blisters
 * and a positive shearing (Nikolsky) sign on normal-looking skin, rather than
 * TEN's tense-then-sheeting detachment. Oral erosions characteristically
 * precede the skin lesions by weeks, which TEN's rash-first, drug-latency
 * picture does not.
 *
 * The investigation results are written to teach the CONTRAST against bullous
 * pemphigoid on purpose: this case's biopsy and direct immunofluorescence show
 * an intraepidermal split with intercellular ("chicken-wire") IgG/C3, versus
 * pemphigoid's subepidermal split with a linear band of IgG/C3 along the
 * basement membrane zone in an older patient with tense bullae. That contrast
 * lives only in investigationsMap text (never in openingVignette or any gate's
 * patientContext, where "pemphigus" and "vulgaris" — the two content words
 * Test Suite 14 / caseSchema extract from conditionName — never appear).
 *
 * Management is corticosteroids as the induction mainstay, with rituximab
 * modelled as a first-line option per the Ritux 3 trial (rituximab + a short
 * course of prednisone reduces cumulative steroid exposure and relapse versus
 * steroid alone) — encoded as a requiresFirst dependency: rituximab given
 * without a bridging corticosteroid leaves 2-3 weeks of unchecked blistering
 * before B-cell depletion takes clinical effect.
 *
 * See CASE_MODEL.md for the therapy model (indicated / neutral / harmful,
 * requiresFirst sequencing) this scaffold follows.
 */
export const SCAFFOLD_PEMPHIGUS: CaseScaffold = {
  id: 'scaffold_pemphigus',
  title: 'Painful Mouth Erosions Followed by Fragile Skin Blisters',
  conditionName: 'Pemphigus Vulgaris',
  subject: 'Dermatology',
  system: 'Dermatology',
  demographics: {
    name: 'Kamala Iyer',
    age: 48,
    gender: 'Female',
    setting: 'OPD',
  },
  openingVignette:
    'A 48-year-old woman presents to the dermatology clinic with painful erosions inside her mouth that have made it difficult to eat or drink for the past three weeks, and for the last five days she has also noticed fragile blisters spreading over her scalp, chest and back that rupture with the slightest touch, leaving raw, weeping patches behind. She says the blisters never feel tense or firm — they collapse the moment they are pressed — and even normal-looking skin nearby seems to peel away with gentle rubbing. She has lost some weight from the difficulty eating and looks tired and uncomfortable, but is alert, talking in full sentences, and not in any breathing difficulty.',
  initialVitals: {
    hr: 96,
    bp: '110/72',
    rr: 18,
    spo2: 98,
    temp: '37.4°C',
    grbs: 102,
  },
  clinchingClue:
    'Gentle lateral rubbing of skin that still looks completely normal makes the outer layer shear off immediately (a positive shearing/Nikolsky sign), and the blisters present are flaccid, thin-roofed and easily ruptured rather than tense — with painful erosions of the buccal mucosa, gums and hard palate that clearly preceded the skin lesions by around three weeks. A skin biopsy confirms a split within the epidermis itself, just above the basal layer, and direct immunofluorescence of the skin around a lesion shows antibody deposited between the skin cells throughout the epidermis in a net-like pattern — a picture that is the opposite of an older patient with tense, intact blisters and a split beneath the epidermis on biopsy.',
  clinchingClueTimeMinutes: 60,
  examFindingsMap: {
    general: 'Alert, uncomfortable and mildly dehydrated from reduced oral intake over the last three weeks; speaks slowly because of oral pain; noticeable recent weight loss.',
    cvs: 'Mildly tachycardic, regular rhythm, normal heart sounds, warm peripheries with a normal capillary refill.',
    chest: 'Clear bilaterally, normal air entry, no added sounds, mild tachypnoea from discomfort only.',
    abdomen: 'Soft, non-tender, normal bowel sounds, no organomegaly.',
    skin: 'Multiple flaccid, thin-walled blisters and larger areas of denuded, weeping skin over the scalp, chest and back, none of them tense or firm to touch; several intact-looking areas adjacent to lesions shear off on gentle lateral pressure (a positive shearing sign). No mucosal-sparing tense bullae and no history of a new drug preceding the eruption.',
    mucosal: 'Multiple painful erosions across the buccal mucosa, gingiva and hard palate with some bleeding on contact; lips are cracked and sore; no ocular or genital involvement at this time.',
    cns: 'Alert and oriented, no focal neurological deficit, distressed only by pain.',
  },
  historyMap: {
    presenting: 'Painful erosions inside the mouth for three weeks, limiting food and fluid intake, followed five days ago by fragile blisters over the scalp, chest and back that rupture easily and leave raw patches.',
    past: 'No known diabetes, hypertension or prior autoimmune illness; no previous similar episode.',
    medications: 'No new medication started in the weeks before onset — specifically no ACE inhibitor, penicillamine, or new NSAID — making a drug-induced trigger for this eruption unlikely.',
    allergies: 'No known drug allergies.',
    family: 'No family history of a similar blistering illness or other known autoimmune disease.',
    social: 'Non-smoker, non-drinker, vegetarian diet — now markedly reduced in volume because of the mouth pain; no recent travel or unwell contacts.',
  },
  investigationsMap: {
    cbc: {
      aliases: ['cbc / hemogram', 'cbc', 'hemogram', 'complete blood count', 'complete blood count hemogram'],
      resultText:
        'CBC: Hb 11.4 g/dL (Reference 12.0–15.0 g/dL) — mildly low, in keeping with reduced intake, WBC 9,800/mcL (Reference 4,000–11,000/mcL) — normal, no leucocytosis to suggest secondary skin infection today, Platelets 268,000/mcL (Reference 150,000–450,000/mcL).',
      turnaroundMinutes: 20,
      category: 'labs',
      isIndicative: true,
    },
    lft: {
      aliases: ['lft', 'liver function tests'],
      resultText:
        'Liver Function Tests: AST 22 U/L (Reference 10–40 U/L), ALT 26 U/L (Reference 7–56 U/L), Total Bilirubin 0.7 mg/dL (Reference 0.2–1.2 mg/dL), Albumin 3.3 g/dL (Reference 3.5–5.0 g/dL) — mildly low albumin from poor intake and protein loss through denuded skin; otherwise a normal baseline before starting systemic corticosteroids and a steroid-sparing agent.',
      turnaroundMinutes: 30,
      category: 'labs',
      isIndicative: true,
    },
    kft: {
      aliases: ['rft / kft (urea, creatinine)', 'kft', 'rft', 'kidney function tests', 'renal function tests', 'renal function tests kft urea creatinine', 'rft kidney function tests urea creatinine'],
      resultText:
        'Renal Function: Blood Urea 34 mg/dL (Reference 15–40 mg/dL), Serum Creatinine 0.8 mg/dL (Reference 0.6–1.1 mg/dL) — normal; a necessary baseline before starting an immunosuppressive steroid-sparing agent, several of which are renally dosed or nephrotoxic.',
      turnaroundMinutes: 30,
      category: 'labs',
      isIndicative: true,
    },
    serum_electrolytes: {
      aliases: ['serum electrolytes (na, k, cl)', 'electrolytes', 'serum electrolytes'],
      resultText:
        'Serum Electrolytes: Na 133 mEq/L (Reference 135–145 mEq/L) — mildly low, Potassium 3.6 mEq/L (Reference 3.5–5.0 mEq/L), Chloride 97 mEq/L (Reference 98–106 mEq/L) — mild derangement in keeping with three weeks of reduced oral intake.',
      turnaroundMinutes: 30,
      category: 'labs',
      isIndicative: true,
    },
    rbs_grbs: {
      aliases: ['rbs / grbs', 'grbs', 'rbs', 'blood sugar', 'random blood sugar', 'rbs random blood sugar'],
      resultText:
        'Random Blood Sugar: 102 mg/dL — normal; worth having as a pre-treatment baseline since high-dose corticosteroids will be started and blood sugar should be trended once they begin.',
      turnaroundMinutes: 10,
      category: 'labs',
      isIndicative: true,
    },
    skin_biopsy_histopath: {
      aliases: ['skin biopsy for histopathology', 'skin biopsy', 'punch biopsy', 'skin biopsy histopathology'],
      resultText:
        'Skin Biopsy, Histopathology (taken from the edge of an early, intact small blister): Suprabasal acantholysis with an intraepidermal split — the basal keratinocytes remain attached to the basement membrane in a "row of tombstones" pattern while the cells above have separated and rounded up. This intraepidermal split is the key contrast against a subepidermal blistering disorder, where the full thickness of the epidermis would instead lift off as one intact sheet.',
      turnaroundMinutes: 2880,
      category: 'labs',
      isIndicative: true,
    },
    dif_skin: {
      aliases: ['direct immunofluorescence (dif)', 'dif skin biopsy', 'direct immunofluorescence', 'dif'],
      resultText:
        'Direct Immunofluorescence (biopsy taken from PERILESIONAL skin that looks normal, not from the blister itself — a lesional or already-eroded sample degrades the antibody deposits and can give a false negative): Intercellular deposition of IgG, with weaker C3, throughout the epidermis in a net-like ("chicken-wire" or fishnet) pattern between keratinocytes. This intercellular pattern is the confirmatory finding here. It is the opposite of what a linear band of IgG and C3 along the basement membrane zone (seen instead in a subepidermal, tense-blister disorder of older patients) would show.',
      turnaroundMinutes: 4320,
      category: 'labs',
      isIndicative: true,
    },
    dsg_elisa: {
      aliases: ['anti-desmoglein antibody elisa', 'desmoglein elisa', 'anti-dsg1 dsg3 elisa', 'dsg elisa', 'anti desmoglein elisa'],
      resultText:
        'Anti-Desmoglein Antibody ELISA: Anti-Dsg3 markedly elevated at 180 U/mL (Reference <20 U/mL); Anti-Dsg1 mildly elevated at 34 U/mL (Reference <20 U/mL) — a combined Dsg3-dominant with lesser Dsg1 pattern matching mucosal erosions that preceded the skin lesions. Titres broadly track disease activity and are useful to trend as treatment response is assessed, though clinical findings still drive day-to-day dosing decisions.',
      turnaroundMinutes: 1440,
      category: 'labs',
      isIndicative: true,
    },
    cxr_screen: {
      aliases: ['chest x-ray pa (pre-immunosuppression screen)', 'chest xray', 'cxr', 'chest x ray'],
      resultText:
        'Chest X-ray PA: No active infiltrate, no cavitation, no significant lymphadenopathy; heart size normal — a reasonable baseline before starting prolonged systemic corticosteroids and a steroid-sparing immunosuppressant, given how common latent tuberculosis is in this setting.',
      turnaroundMinutes: 30,
      category: 'imaging',
      isIndicative: true,
    },
    hbv_screen: {
      aliases: ['hbsag & anti-hbc (pre-rituximab screen)', 'hbsag', 'hepatitis b screen', 'hbv screen', 'hbsag anti hbc'],
      resultText:
        'Hepatitis B Screen: HBsAg negative, anti-HBc negative — no evidence of current or past hepatitis B infection. This must be checked before rituximab is given, since B-cell depletion can reactivate hepatitis B in a previously infected or chronically infected patient, occasionally with fatal fulminant hepatitis.',
      turnaroundMinutes: 180,
      category: 'labs',
      isIndicative: true,
    },
    ana_panel: {
      aliases: ['ana / autoimmune serology', 'ana panel', 'antinuclear antibody'],
      resultText: 'ANA: Negative at a titre of 1:40.',
      turnaroundMinutes: 480,
      category: 'labs',
      isIndicative: false,
      appropriateness: 'neutral',
      yieldNote:
        'A general antinuclear antibody panel does not help here: it is a screen for lupus and other connective tissue disease, not for a blistering skin disorder, and a negative or positive result changes nothing about how this presentation is worked up. The tests that actually distinguish one blistering disease from another are the skin biopsy, the direct immunofluorescence pattern, and the specific antibody titres already sent.',
    },
  },
  therapiesMap: {
    oral_rehydration: {
      aliases: ['oral rehydration & soft diet advice', 'oral rehydration', 'iv fluids', 'soft diet advice', 'hydration'],
      responseText: 'Oral rehydration solution and a soft, non-irritating diet are advised, with IV fluids offered if oral intake cannot meet her needs.',
      onsetMinutes: 60,
      vitalsEffect: { hr: -4 },
      appropriateness: 'indicated',
      rationale: 'Three weeks of painful oral erosions has led to mild dehydration and hyponatraemia from reduced intake; correcting this is simple, low-risk supportive care while definitive treatment is arranged.',
    },
    topical_analgesia_mouth: {
      aliases: ['lidocaine viscous mouth rinse', 'lidocaine mouth rinse', 'topical oral analgesic', 'viscous lidocaine'],
      responseText: 'A topical viscous lidocaine mouth rinse is given before meals to numb the oral erosions enough to allow eating and drinking.',
      onsetMinutes: 15,
      appropriateness: 'indicated',
      rationale: 'Painful oral erosions are the main reason she cannot maintain adequate intake; a topical anaesthetic used just before meals directly targets that and buys time while systemic treatment takes effect.',
    },
    topical_corticosteroid_skin: {
      aliases: ['high-potency topical corticosteroid', 'topical corticosteroid', 'topical clobetasol', 'clobetasol cream'],
      responseText: 'A high-potency topical corticosteroid is applied to localised skin lesions as an adjunct alongside systemic treatment.',
      onsetMinutes: 720,
      appropriateness: 'indicated',
      rationale: 'Topical high-potency corticosteroid speeds healing of individual lesions and can reduce the systemic corticosteroid dose needed, but on its own it cannot control disease this widespread with mucosal involvement — it is an adjunct, not a substitute for systemic treatment.',
    },
    systemic_corticosteroid: {
      aliases: ['oral prednisolone (1 mg/kg/day)', 'oral prednisolone', 'systemic corticosteroid', 'prednisolone', 'oral steroids'],
      responseText: 'Oral prednisolone is started at 1 mg/kg/day as induction therapy, started on the clinical picture alone without waiting for the biopsy or immunofluorescence to return.',
      onsetMinutes: 720,
      vitalsEffect: { hr: -6, temp: '37.1°C' },
      appropriateness: 'indicated',
      rationale: 'Systemic corticosteroids remain the mainstay of induction therapy and should begin as soon as the clinical picture is convincing — flaccid blisters, a positive shearing sign, and mucosal erosions preceding skin lesions — rather than waiting for the biopsy or direct immunofluorescence to return; diagnostic sampling should still be taken first, but starting treatment does not have to wait for the report.',
    },
    steroid_sparing_agent: {
      aliases: ['azathioprine (steroid-sparing agent)', 'azathioprine', 'mycophenolate mofetil', 'steroid-sparing agent'],
      responseText: 'A steroid-sparing immunosuppressant (azathioprine) is started alongside the corticosteroid.',
      onsetMinutes: 4320,
      appropriateness: 'indicated',
      rationale: 'A steroid-sparing agent takes several weeks to show its own effect, so it is started early, alongside the corticosteroid rather than after, specifically to allow the corticosteroid dose to be tapered sooner and to reduce cumulative steroid-related morbidity over the course of treatment.',
    },
    rituximab: {
      aliases: ['rituximab infusion', 'rituximab', 'iv rituximab', 'inj rituximab'],
      responseText: 'Rituximab is infused as a first-line B-cell depleting agent, given together with the short course of oral corticosteroid already started.',
      onsetMinutes: 4320,
      appropriateness: 'indicated',
      rationale: 'Trial evidence (the Ritux 3 protocol) supports first-line rituximab paired with a short course of corticosteroid over corticosteroid alone, giving higher remission rates, fewer relapses and a lower cumulative steroid dose — it is now a recognised modern first-line option, not only a rescue agent for refractory disease.',
      requiresFirst: ['systemic_corticosteroid'],
      harmfulSequenceResponseText: 'Rituximab is infused as the sole initial agent, with no corticosteroid bridge. B-cell depletion takes two to three weeks to reach clinical effect, and over that unprotected window her blistering and oral erosions continue to spread, with a real risk of secondary skin infection and worsening fluid and protein loss.',
      harmfulSequenceVitalsEffect: { hr: 10, temp: '38.1°C' },
      harmfulSequenceRationale: 'Rituximab alone leaves a two-to-three-week lag before B-cell depletion translates into disease control, which is exactly why the standard first-line regimen pairs it with a short course of corticosteroid to control the disease acutely while rituximab takes effect — giving it without that bridge exposes her to weeks of ongoing, unchecked blistering.',
    },
    ppi_gastroprotection: {
      aliases: ['proton pump inhibitor (gastroprotection)', 'pantoprazole', 'ppi', 'gastroprotection'],
      responseText: 'A proton pump inhibitor is started for gastric protection alongside high-dose corticosteroids.',
      onsetMinutes: 30,
      appropriateness: 'indicated',
      rationale: 'High-dose, prolonged corticosteroid therapy raises the risk of peptic ulceration; routine gastroprotection is standard alongside an induction steroid course.',
    },
    calcium_vitd: {
      aliases: ['calcium & vitamin d supplementation', 'calcium and vitamin d', 'calcium supplementation', 'vitamin d supplementation'],
      responseText: 'Oral calcium and vitamin D supplementation is started for bone protection given the anticipated duration of corticosteroid therapy.',
      onsetMinutes: 30,
      appropriateness: 'indicated',
      rationale: 'A prolonged corticosteroid course carries a real risk of steroid-induced osteoporosis; calcium and vitamin D supplementation from the outset is standard preventive practice alongside induction treatment.',
    },
    pjp_prophylaxis: {
      aliases: ['cotrimoxazole prophylaxis', 'co-trimoxazole prophylaxis', 'pjp prophylaxis', 'trimethoprim-sulfamethoxazole prophylaxis'],
      responseText: 'Prophylactic co-trimoxazole is started against Pneumocystis jirovecii pneumonia, given the combination of high-dose corticosteroid and a steroid-sparing immunosuppressant planned for a prolonged course.',
      onsetMinutes: 30,
      appropriateness: 'indicated',
      rationale: 'Sustained high-dose corticosteroid combined with a second immunosuppressant meaningfully raises the risk of Pneumocystis pneumonia; prophylaxis is recommended for the duration of significant combined immunosuppression, not only after an infection occurs.',
    },
    empiric_acyclovir: {
      aliases: ['iv acyclovir (presumed herpetic stomatitis)', 'acyclovir', 'iv acyclovir', 'antiviral therapy'],
      responseText: 'IV acyclovir is started, treating the oral erosions as presumed herpetic gingivostomatitis.',
      onsetMinutes: 60,
      vitalsEffect: { hr: 6, temp: '38.0°C' },
      appropriateness: 'harmful',
      rationale: 'These erosions lack the grouped vesicles, systemic viral prodrome or age group typical of herpetic gingivostomatitis, and an antiviral does nothing for an antibody-mediated blistering disease — it delays the corticosteroid and steroid-sparing therapy that would actually control the disease, while the oral erosions and now-appearing skin blisters continue to spread untreated.',
    },
  },
  criticalInterventions: [
    {
      orderOrActionPattern: /skin biopsy|punch biopsy/i,
      name: 'Diagnostic Skin Biopsy Obtained',
      targetMilestoneMinutes: 120,
    },
    {
      orderOrActionPattern: /oral prednisolone|systemic corticosteroid|prednisolone/i,
      name: 'Systemic Corticosteroid Started',
      targetMilestoneMinutes: 240,
    },
  ],
  incidentalPool: [
    {
      id: 'inc_pemphigus_1',
      title: 'Incidental Calcified Granuloma on Chest X-ray',
      description: 'The chest X-ray taken as a pre-immunosuppression screen incidentally shows a 4 mm calcified granuloma in the right upper lobe, with no active infiltrate or lymphadenopathy.',
      correctAction: 'No treatment needed for an old, healed calcified granuloma; there are no markers of active disease, so planned immunosuppression proceeds while staying alert for any future respiratory symptoms.',
      status: 'unnoticed',
    },
    {
      id: 'inc_pemphigus_2',
      title: 'Incidental Mild Microcytic Anaemia on CBC',
      description: 'The baseline CBC incidentally shows a mild microcytic pattern alongside the low haemoglobin already explained by reduced oral intake.',
      correctAction: 'Note it for iron studies and, if it persists once oral intake normalises with treatment, routine work-up for a separate cause rather than attributing it entirely to this presentation.',
      status: 'unnoticed',
    },
  ],
  gateMilestones: [
    {
      roleTag: 'DIAGNOSIS',
      patientContext: 'Painful erosions inside the mouth came first, three weeks ago, and only in the last five days have fragile blisters appeared on the skin that collapse the moment they are touched — with normal-looking skin nearby shearing off under gentle rubbing.',
      consequenceOnRight: 'This pattern — mucosal erosions preceding flaccid, easily-ruptured blisters and a positive shearing sign on normal-looking skin — is recognised as an intraepidermal, antibody-mediated blistering process, clearly distinct from a subepidermal disorder of tense, intact bullae typically seen in an older patient.',
      consequenceOnWrong: 'The flaccid blisters are mistaken for a subepidermal, tense-bullae disorder of older age, and the workup and initial treatment plan are built around the wrong mechanism.',
    },
    {
      roleTag: 'INVESTIGATION',
      patientContext: 'The team must decide whether to send a diagnostic skin biopsy with immunofluorescence before starting treatment, or to begin immunosuppression on the clinical picture alone and skip sampling altogether.',
      consequenceOnRight: 'A biopsy is taken promptly — from the edge of an early intact blister for routine histopathology, and from normal-looking perilesional skin for immunofluorescence — before or alongside starting treatment, so the diagnosis is secured rather than assumed.',
      consequenceOnWrong: 'Treatment is started with no biopsy ever sent, so if she fails to respond as expected there is no confirmed diagnosis to fall back on, and a different blistering disorder needing a different treatment could be missed entirely.',
    },
    {
      roleTag: 'PHARM',
      patientContext: 'With the clinical picture already convincing and the biopsy sample taken, the team discusses whether to wait for the histopathology and immunofluorescence report before starting any treatment, or to begin systemic therapy now.',
      consequenceOnRight: 'Oral corticosteroid induction therapy is started on the clinical picture without waiting for the biopsy report, since the sample has already been taken and delaying treatment only prolongs active blistering, painful erosions and fluid loss.',
      consequenceOnWrong: 'Treatment is withheld until the pathology report returns days later, or the oral erosions are instead treated empirically as a viral infection, leaving the true disease process to advance unchecked in the meantime.',
    },
    {
      roleTag: 'MANAGEMENT',
      patientContext: 'Once the diagnosis is secured and corticosteroids are underway, the team discusses long-term treatment strategy, including whether a modern antibody-depleting infusion has any role here or should be reserved only if she fails to respond.',
      consequenceOnRight: 'A first-line B-cell depleting infusion is planned together with the short corticosteroid course already started, since trial evidence shows this combination gives higher remission and fewer relapses with a lower cumulative steroid exposure than steroid alone.',
      consequenceOnWrong: 'The infusion is given in isolation with no corticosteroid bridge, leaving weeks of unchecked blistering before its delayed effect takes hold, or it is withheld entirely and she is committed to a much longer, higher cumulative dose of steroids than necessary.',
    },
    {
      roleTag: 'COMPLICATION',
      patientContext: 'Before committing her to a prolonged course of a steroid-sparing immunosuppressant and a B-cell depleting infusion, the team reviews what screening should be done first.',
      consequenceOnRight: 'A chest X-ray to screen for latent tuberculosis and a hepatitis B screen before the depleting infusion are both completed before or alongside starting immunosuppression, since reactivation of either during treatment is a recognised and serious complication.',
      consequenceOnWrong: 'Immunosuppression is started with no screening at all, risking a missed case of latent tuberculosis reactivating, or fulminant hepatitis B reactivation triggered by the depleting infusion in an unscreened, previously infected patient.',
    },
  ],
};
