// components/GoogleMapEmbed.tsx

const GoogleMapEmbed = () => {
    return (
      <div className=" my-8">
        <h2 className="text-2xl font-semibold text-center mb-4">Our Location</h2>
        <div className="relative w-full h-[400px]">
        <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.202324369304!2d102.79516497493213!3d17.40207540238229!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31239d7bdabede29%3A0xb71316ef62b44a09!2z4Lia4Lij4Li04Lip4Lix4LiXIOC5guC4peC4q-C4sOC4geC4tOC4iOC4reC4uOC4lOC4oyDguIjguLPguIHguLHguJQ!5e0!3m2!1sen!2sth!4v1739899575841!5m2!1sen!2sth"
        width="600" 
        height="450"
        allowFullScreen={false} 
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
    );
  };
  
  export default GoogleMapEmbed;
  
  