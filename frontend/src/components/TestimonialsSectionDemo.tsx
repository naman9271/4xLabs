import { TestimonialsSection } from "@/components/ui/testimonials-with-marquee"

const testimonials = [
  {
    author: {
      name: "Emma Thompson",
      handle: "@emmatech",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
    },
    text: "4xLabs delivered our e-commerce website ahead of schedule. Their attention to detail and technical expertise exceeded our expectations.",
    href: "https://twitter.com/emmatech"
  },
  {
    author: {
      name: "David Park",
      handle: "@davidstartup",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    text: "They fixed critical bugs in our mobile app and improved performance by 40%. Professional, fast, and reliable freelancing service.",
    href: "https://twitter.com/davidstartup"
  },
  {
    author: {
      name: "Sofia Rodriguez",
      handle: "@sofiadesign",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
    },
    text: "Amazing UI/UX design work! They transformed our outdated interface into a modern, user-friendly experience. Highly recommended!"
  },
  {
    author: {
      name: "Marcus Chen",
      handle: "@marcusco",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    text: "From concept to deployment, 4xLabs handled our full-stack development project flawlessly. Great communication throughout."
  },
  {
    author: {
      name: "Sarah Johnson",
      handle: "@sarahbiz",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    text: "They built our custom CRM system exactly as we envisioned. The team's expertise in modern web technologies is impressive."
  },
  {
    author: {
      name: "Alex Rivera",
      handle: "@alexdev",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face"
    },
    text: "Quick turnaround on API integration and database optimization. 4xLabs saved us weeks of development time."
  },
  {
    author: {
      name: "Jessica Wong",
      handle: "@jessicacto",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
    },
    text: "Exceptional WordPress development and SEO optimization. Our website traffic increased by 200% after their work."
  },
  {
    author: {
      name: "Michael Brooks",
      handle: "@mikefounder",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
    },
    text: "4xLabs migrated our entire legacy system to the cloud seamlessly. Zero downtime and improved scalability."
  },
  {
    author: {
      name: "Lisa Chen",
      handle: "@lisaproduct",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face"
    },
    text: "The React Native app they built for us has 4.8 stars on both app stores. Quality code and smooth performance."
  },
  {
    author: {
      name: "Roberto Silva",
      handle: "@robertoceo",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face"
    },
    text: "Data analytics dashboard that transformed our business insights. Clean code, beautiful design, and powerful features."
  },
  {
    author: {
      name: "Rachel Kim",
      handle: "@racheldesign",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face"
    },
    text: "Logo design and complete brand identity package exceeded our vision. Professional, creative, and delivered on time."
  },
  {
    author: {
      name: "Tom Anderson",
      handle: "@tomtech",
      avatar: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=150&h=150&fit=crop&crop=face"
    },
    text: "DevOps setup and CI/CD pipeline implementation was flawless. Our deployment process is now 10x faster."
  },
  {
    author: {
      name: "Maya Patel",
      handle: "@mayapm",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face"
    },
    text: "Blockchain smart contract development for our DeFi project. Security-first approach and thorough testing."
  },
  {
    author: {
      name: "Chris Taylor",
      handle: "@christaylor",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    text: "Machine learning model integration boosted our recommendation engine accuracy by 35%. Impressive technical skills."
  }
]

export function TestimonialsSectionDemo() {
  return (
    <div id="portfolio">
      <TestimonialsSection
        title="Trusted by businesses worldwide"
        description="Join hundreds of satisfied clients who've transformed their digital presence with 4xLabs freelancing services"
        testimonials={testimonials}
      />
    </div>
  )
}
