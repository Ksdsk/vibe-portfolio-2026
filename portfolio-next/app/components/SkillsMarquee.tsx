'use client';

const skills = [
  'TypeScript', 'JavaScript', 'Python', 'Java', 'Go', 'C++', 'Rust',
  'React', 'Next.js', 'Vue', 'Angular', 'Svelte', 'Node.js', 'Express',
  'FastAPI', 'Spring Boot', 'Django', 'Flask', 'GraphQL', 'REST APIs',
  'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Terraform', 'Jenkins',
  'GitHub Actions', 'CircleCI', 'PostgreSQL', 'MongoDB', 'Redis', 'DynamoDB',
  'MySQL', 'Elasticsearch', 'RabbitMQ', 'Kafka', 'gRPC', 'WebSockets',
  'OAuth', 'JWT', 'SAML', 'Encryption', 'TLS/SSL', 'Git', 'Linux',
  'Bash', 'CI/CD', 'Microservices', 'Serverless', 'Lambda', 'S3',
  'CloudFormation', 'IAM', 'VPC', 'Load Balancers', 'Auto Scaling',
  'Monitoring', 'Logging', 'Prometheus', 'Grafana', 'Datadog', 'Splunk',
  'Agile', 'Scrum', 'TDD', 'Unit Testing', 'Integration Testing',
  'Jest', 'Pytest', 'JUnit', 'Cypress', 'Selenium', 'HTML', 'CSS',
  'Tailwind', 'SASS', 'Webpack', 'Vite', 'Babel', 'ESLint', 'Prettier',
  'ChatGPT', 'Claude', 'GPT-4', 'Gemini', 'LLMs', 'Prompt Engineering',
  'LangChain', 'Vector Databases', 'RAG', 'Fine-tuning', 'OpenAI API',
  'Anthropic API', 'Hugging Face', 'TensorFlow', 'PyTorch', 'Scikit-learn',
  'Machine Learning', 'Deep Learning', 'Neural Networks', 'NLP', 'Computer Vision',
  'Stable Diffusion', 'Midjourney', 'DALL-E', 'AI Agents', 'Copilot'
];

export default function SkillsMarquee() {
  // Duplicate skills for seamless loop
  const duplicatedSkills = [...skills, ...skills];

  return (
    <div className="relative overflow-hidden h-[180px] border border-[#222] rounded-sm bg-black/50">
      <div className="flex flex-wrap gap-3 p-4 animate-scroll-vertical">
        {duplicatedSkills.map((skill, index) => (
          <span
            key={`${skill}-${index}`}
            className="inline-block px-3 py-1.5 text-[0.7rem] text-[#999] border border-[#333] rounded-sm whitespace-nowrap hover:border-[#666] hover:text-white transition-colors"
          >
            {skill}
          </span>
        ))}
      </div>
      
      {/* Gradient overlays for fade effect */}
      <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-black to-transparent pointer-events-none z-10"></div>
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black to-transparent pointer-events-none z-10"></div>
    </div>
  );
}
