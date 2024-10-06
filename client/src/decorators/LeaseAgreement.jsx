import PropTypes from "prop-types";
import "./styles/LeaseAgreement.css";

const LeaseAgreement = ({ data }) => {
  const month = new Date().toLocaleString("default", { month: "long" });

  function addMonthsAndFormatDate(dateString, monthsToAdd) {
    const date = new Date(dateString);
    date.setMonth(date.getMonth + monthsToAdd);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    // Function to add ordinal suffix
    const getOrdinal = (day) => {
      if (day > 3 && day < 21) return "th"; // Covers 11th - 13th
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    return `${day}${getOrdinal(day)} day of ${month}, ${year}`;
  }

  function formatDate(dateStr) {
    const date = new Date(dateStr);

    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    // Function to add ordinal suffix
    const getOrdinal = (day) => {
      if (day > 3 && day < 21) return "th"; // Covers 11th - 13th
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    return `${day}${getOrdinal(day)} day of ${month}, ${year}`;
  }

  return (
    <div className="lease-agreement">
      <h1>Lease Agreement</h1>
      <p>
        THIS LEASE AGREEMENT is made at Faridabad, Haryana on{" "}
        <span className="colorRed" style={{ textDecoration: "underline" }}>
          {" "}
          {new Date().getDate()}
          <sup style={{ textTransform: "lowercase" }}>
            {new Date().getDate() == 1
              ? "st"
              : new Date().getDate() == 2
              ? "nd"
              : new Date().getDate() == 3
              ? "rd"
              : "th"}
          </sup>{" "}
          day of {month}, {new Date().getFullYear()}
        </span>
        .
      </p>

      <h2>Between</h2>
      <p>
        <span className="colorRed">
          {data?.landlords?.map((landlord, index) => {
            if (index === data?.landlords.length - 1) {
              return (
                landlord.name +
                " (" +
                landlord.idType +
                " " +
                landlord.idNumber +
                ") " +
                landlord.titleParent +
                " " +
                landlord.fName +
                " resident of " +
                landlord.address +
                " "
              );
            } else {
              return (
                landlord.name +
                " (" +
                landlord.idType +
                " " +
                landlord.idNumber +
                ") " +
                landlord.titleParent +
                " " +
                landlord.fName +
                " resident of " +
                landlord.address +
                " and "
              );
            }
          })}
        </span>
        hereinafter called the ‘LESSOR’ (which expression shall unless excluded
        by or repugnant to the context, includes his heirs, successors, legal
        representatives, executors, administrators and assigns) of the one part.
      </p>
      <h2>And</h2>
      <p>
        <span className="colorRed">
          {data?.tenants?.map((landlord, index) => {
            if (index === data?.landlords.length - 1) {
              return (
                landlord.name +
                " (" +
                landlord.idType +
                " " +
                landlord.idNumber +
                ") " +
                landlord.titleParent +
                " " +
                landlord.fName +
                " resident of " +
                landlord.address +
                " "
              );
            } else {
              return (
                landlord.name +
                " (" +
                landlord.idType +
                " " +
                landlord.idNumber +
                ") " +
                landlord.titleParent +
                " " +
                landlord.fName +
                " resident of " +
                landlord.address +
                " and "
              );
            }
          })}
        </span>
        , hereinafter called the ‘LESSEE’ (which expression shall unless
        repugnant to the context or meaning thereof the other part, include his
        heirs, successors, legal representatives, executors, administrators and
        assigns) on the other part.
      </p>
      <br />
      <p>
        Whereas The LESSOR is the absolute owner of the{" "}
        <span className="colorRed">
          {data?.propertyName ?? "********"}{" "}
          {data?.propertyAddress ?? "********"}
        </span>
        , (hereinafter called the “Premises’’) and whereas LESSOR has agreed to
        grant to the lessee on lease the demised premises consisting of Two
        Bedrooms, One Drawing cum Dining, Two Toilets and One Kitchen on the
        following terms and conditions as mentioned hereinafter:
      </p>

      <h2>Terms and Conditions</h2>
      <ol>
        <li>
          The Lessee shall pay a sum of Rs.{" "}
          <span className="colorRed">{data?.propertyPrice}</span>/- per month as
          a rent in advance on or before the 20th day of each English Calendar
          month.
        </li>
        <li>
          The Lessee has paid to the Lessor a sum of Rs.{" "}
          <span className="colorRed">{data?.propertyPrice}</span>/- as an
          interest Free Security deposit which will be refundable back to the
          Lessee, on expiry/Termination of the Lease agreement and at the time
          of handling over the physical vacant possession of the above said
          tenanted leased premises to the Lessor after deducting all expenses
          towards outstanding bills, major damages wear and tear, if any of the
          property by the Lessee.
        </li>
        <li>
          The Lessee is granted for a period of {data?.numberOfMonth ?? "**"}{" "}
          months only, commencing from &nbsp;
          <span className="colorRed">
            {data?.startLeaseDate && formatDate(data?.startLeaseDate)}
          </span>
          to{" "}
          {addMonthsAndFormatDate(
            data?.startLeaseDate,
            parseInt(data?.numberOfMonth)
          )}
          . The Lessee must inform the Lessor in writing of his desire to seek a
          renewal of the Lease agreement at least one month prior to the expiry
          of the Lease. Any extension will become operative only when there is a
          written agreement incorporating the agreed terms between the Lessee
          and the Lessor.
        </li>
        <li>
          The Lessee shall not assign or sublet or part with the whole or any
          part of the said leased premises to anyone else in any case in any
          circumstances.
        </li>
        <li>
          The Lessee shall use the said leased premises only for{" "}
          <span className="colorRed">
            {" "}
            {data?.propertyType ?? "*********"}{" "}
          </span>
          purposes and no part of the premises will be used for any other
          purpose.
        </li>
        <li>
          The Lessee shall {data?.propertyType === "Residential" ? "not" : " "}{" "}
          carry any trade, occupation, business, or profession in the said
          premises.
        </li>
        <li>
          The Lessee shall not make any additions or alterations in the leased
          premises without obtaining prior written permission from the Lessor.
        </li>
        <li>
          The Lessee shall keep the leased premises along with fittings,
          fixtures, and furniture in good condition and take care of maintenance
          and minor repairs at his own cost during the period of the lease
          agreement.
        </li>
        <li>
          The Lessee shall permit the Lessor or his authorized agent to enter
          into the said leased premises for inspection/general checking or to
          carry out the repair work at any reasonable time convenient to both
          during the period of the lease.
        </li>
        <li>
          The Lessee shall be responsible to attend all the minor day-to-day
          repairs such as replacement of bulbs and tubes, at his own cost but
          the major repairs in the said leased premises shall be attended to by
          the Lessor at his own cost.
        </li>
        <li>
          The Lessee shall not store any inflammable materials or explosives in
          the said leased premises or do or omit to do any act which causes
          nuisance or annoyance or violation of any applicable rules and law of
          the concerned local society/authority, including laws framed for the
          protection of fire.
        </li>
        <li>
          The Lessee shall not nor permit to be done nor suffer anything to be
          done in the said premises, which may be a nuisance or annoyance to the
          neighbor nor carry on any illegal or immoral activities in the said
          premises.
        </li>
        <li>
          The Lessee shall pay electricity charges on the basis of the actual
          consumption as per the meter reading for both the regular supply from
          the state electricity board and backup connection from the space group
          as per the bill raised by the appropriate authority and comply with
          the payment norms in existence.
        </li>
        <li>
          The Lessee shall pay directly for cable connection charges every month
          to the cable operator.
        </li>
        <li>
          The Lessee shall keep all the paid-up bills of electricity, telephone,
          cable, and other allied services as a custodian on behalf of the
          Lessor and produce them on demand to the Lessor for his record.
        </li>
        <li>
          This lease can be extended for another period of eleven months with
          the mutual consent of both parties after increasing @10% in the lease
          rent.
        </li>
        <li>
          If the Lessee fails to pay the monthly rent to the Lessor as agreed
          upon in time, this lease will be terminated/canceled automatically and
          the Lessee will have no right/claim for the lease. The Lessor can take
          possession of the said premises without any process of law, and the
          Lessee shall have no objection or claim over the goods lying in the
          said premises at such time.
        </li>
        <li>
          The Lessee shall return to the Lessor the keys of the flat on the
          expiry or termination of the lease agreement. The Lessee shall remove
          themselves and their respective belongings from the flat on expiry or
          termination of the lease agreement.
        </li>
        <li>
          The Lessor shall under no circumstances be liable to pay for any
          breakage/damages to the premises on account of burglary, theft,
          robbery, fire, etc.
        </li>
        <li>
          The Lessee will follow and abide by all the above-mentioned terms and
          conditions of the agreement, and if any violation is committed, the
          Lessor will be entitled to evict the Lessee from the demised premises
          without any prior notice.
        </li>
        <li>
          In any dispute that may arise between both parties, the dispute/case
          will be handed over to the concerned court of law of
          Gurgaon/Faridabad.
        </li>
      </ol>

      <h2>Signatures</h2>
      <div className="signatures">
        <p>
          LESSOR: ________________________ <br />
          LESSEE: ________________________
        </p>
        <p>
          Witness 1: ________________________ <br />
          Witness 2: ________________________
        </p>
      </div>
    </div>
  );
};

export default LeaseAgreement;

LeaseAgreement.propTypes = {
  data: PropTypes.object,
};
