import React from 'react';
import Link from 'next/link';
import { match, P} from 'ts-pattern';

enum BodyParts {
  Ankle = "Ankle",
  Armpit = "Armpit",
  Butt = "Butt",
  Chest = "Chest",
  Clavicle = "Clavicle",
  Crotch = "Crotch",
  Elbow = "Elbow",
  Foot = "Foot",
  Forearm = "Forearm",
  Hand = "Hand", 
  Head = "Head",
  Hip = "Hip",
  Knee = "Knee",
  LowerBack = "Lower Back",
  LowerLeg = "Lower Leg",
  Neck = "Neck",
  Shoulder = "Shoulder", 
  ShoulderBlade = "Shoulder Blade",
  Spine = "Spine",
  Stomach = "Stomach",
  Thigh = "Thigh",
  UpperArm = "Upper Arm",
  UpperBack = "Upper Back",
  Wrist = "Wrist",
}

enum BodyLocations {
  Upper,
  Lower,
  Arms,
  Head,
  Hips 
}

type BodyPart = {
  part: BodyParts;
  location: BodyLocations;
  symmetric: boolean;
};


let body_parts: BodyPart[] = [
  //Head
  {part: BodyParts.Head, location: BodyLocations.Head, symmetric: false},
  {part: BodyParts.Neck, location: BodyLocations.Head, symmetric: false},

  //Upper 
  {part: BodyParts.Chest, location: BodyLocations.Upper, symmetric: false},
  {part: BodyParts.Spine, location: BodyLocations.Upper, symmetric: false},
  {part: BodyParts.ShoulderBlade, location: BodyLocations.Upper, symmetric: true},
  {part: BodyParts.Shoulder, location: BodyLocations.Upper, symmetric: true},
  {part: BodyParts.Clavicle, location: BodyLocations.Upper, symmetric: true},
  {part: BodyParts.Stomach, location: BodyLocations.Upper, symmetric: true},
  {part: BodyParts.UpperBack, location: BodyLocations.Upper, symmetric: true},
  {part: BodyParts.LowerBack, location: BodyLocations.Upper, symmetric: true},

  //Arms 
  {part: BodyParts.Shoulder, location: BodyLocations.Arms, symmetric: true},
  {part: BodyParts.Hand, location: BodyLocations.Arms, symmetric: true},
  {part: BodyParts.Elbow, location: BodyLocations.Arms, symmetric: true},
  {part: BodyParts.Forearm, location: BodyLocations.Arms, symmetric: true},
  {part: BodyParts.Wrist, location: BodyLocations.Arms, symmetric: true},
  {part: BodyParts.UpperArm, location: BodyLocations.Arms, symmetric: true},


  //Hip
  {part: BodyParts.Hip, location: BodyLocations.Hips, symmetric: false},

  //Lower
  {part: BodyParts.Crotch, location: BodyLocations.Lower, symmetric: false},
  {part: BodyParts.Ankle, location: BodyLocations.Lower, symmetric: true},
  {part: BodyParts.Armpit, location: BodyLocations.Lower, symmetric: true},
  {part: BodyParts.Butt, location: BodyLocations.Lower, symmetric: true},
  {part: BodyParts.Foot, location: BodyLocations.Lower, symmetric: true},
  {part: BodyParts.Knee, location: BodyLocations.Lower, symmetric: true},
  {part: BodyParts.LowerLeg, location: BodyLocations.Lower, symmetric: true},
  {part: BodyParts.Thigh, location: BodyLocations.Lower, symmetric: true},
] 


let VALID = "✅";
let INVALID = "╳";
let RUDE = "⁉️"
let INTIMATE = "⁉️ / ❤"
let MAYBE = " ⚠️";
let IDK = "❓";

function valid_connection(ldbp: BodyPart, frbp: BodyPart) {
  return match([ldbp, frbp])
  // TODO add some notes about things
  //Upper body doesn't touch lower body
  .with([{location: BodyLocations.Upper}, {location: BodyLocations.Lower}], () => INVALID)
  .with([{location: BodyLocations.Lower}, {location: BodyLocations.Upper}], () => INVALID)

  //Head 
  .with([{part: BodyParts.Head}, {part: BodyParts.Head} ], () => INTIMATE)
  .with([{part: BodyParts.Chest}, {part: BodyParts.Head} ], () => INTIMATE)
  .with([{part: BodyParts.Hand}, {part: BodyParts.Head} ], () => INTIMATE)
  .with([{part: BodyParts.Head}, {part: BodyParts.Hand} ], () => INTIMATE)
  .with([P._, {part: BodyParts.Head} ], () => INVALID)
  .with([{part: BodyParts.Head}, P._ ], () => INVALID)

  // Sometimes a body roll can get real close 
  .with([{part: BodyParts.Chest}, {part: BodyParts.Chest} ], () => MAYBE)
  .with([P._, {part: BodyParts.Chest} ], () => RUDE)

  // Nope!
  .with([{location: BodyLocations.Upper}, {part: BodyParts.Crotch}], () => INVALID)
  .with([{location: BodyLocations.Head}, {part: BodyParts.Crotch}], () => INVALID)
  .with([{part: BodyParts.Crotch},{location: BodyLocations.Upper}], () => INVALID)
  .with([{part: BodyParts.Crotch},{location: BodyLocations.Head}], () => INVALID)

  .with([P._, {part: BodyParts.Crotch} ], () => RUDE)
  .with([{part: BodyParts.Crotch}, P._], () => RUDE)

  //Butt is a lower body thing only I think 
  .with([P._, {part: BodyParts.Butt} ], () => RUDE)
  .with([{part: BodyParts.Butt}, P._ ], () => RUDE)

  //Hands 
  .with([{part: BodyParts.Hand}, P._], () => VALID)
  .with([P._, {part: BodyParts.Hand}], () => VALID)


  //Idk the rest 
  .with(P._, () => IDK)
  .exhaustive();
}

export function CT({}) {
  return (
    <div> 

<h3> Zack's Bachata Sensual Connection Table v1</h3> 
This is a work in progress, still working this out. It lays out all the possible points of contact between two dancers and whether they are Good or not. {VALID} = valid, {INVALID} = invalid, {RUDE} = rude, {INTIMATE} = intimate which might be considered rude, {MAYBE} = maybe possible unsure rare, {IDK} = haven't gotten there yet. 
    <table className="connection_table">
      <thead>
        <tr>
        <th> Lead/Follower</th>
        {body_parts.map( bp => {
          return (<th key={bp.part}> F's {bp.part} </th> )
        })}
        </tr>
      </thead>
      <tbody> 
      {body_parts.map( ldbp => {

        return (<tr key={ldbp.part}>
          <td> L's {ldbp.part}</td>
          {body_parts.map(frbp => {
            return (<td style={{textAlign : "center"}} key={ ldbp.part + ' ' + frbp.part}> {valid_connection(ldbp, frbp)}</td>)
            
          })}
           </tr>)
      })}
      </tbody>
    </table>
    </div> 
  );
}
