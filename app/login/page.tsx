'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Building2, Users, BarChart3, CheckSquare, ArrowRight } from 'lucide-react';

export default function LoginPortalSelection() {
  const router = useRouter();

  const portals = [
    {
      id: 'admin',
      name: 'Admin Portal',
      description: 'System administration and organization management',
      icon: Building2,
      color: 'from-blue-500 to-blue-600',
      href: '/login/admin',
      iconBg: 'bg-blue-100 dark:bg-blue-900',
      textColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      id: 'client',
      name: 'Client Portal',
      description: 'Customer account and service management',
      icon: Users,
      color: 'from-green-500 to-green-600',
      href: '/login/client',
      iconBg: 'bg-green-100 dark:bg-green-900',
      textColor: 'text-green-600 dark:text-green-400',
    },
    {
      id: 'finance',
      name: 'Finance Portal',
      description: 'Financial tracking and reporting',
      icon: BarChart3,
      color: 'from-purple-500 to-purple-600',
      href: '/login/finance',
      iconBg: 'bg-purple-100 dark:bg-purple-900',
      textColor: 'text-purple-600 dark:text-purple-400',
    },
    {
      id: 'project',
      name: 'Project Management',
      description: 'Project tracking and team collaboration',
      icon: CheckSquare,
      color: 'from-orange-500 to-orange-600',
      href: '/login/project',
      iconBg: 'bg-orange-100 dark:bg-orange-900',
      textColor: 'text-orange-600 dark:text-orange-400',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Homeware Portal Selection
          </h1>
          <p className="text-lg text-slate-300">
            Choose your portal to get started
          </p>
        </div>

        {/* Portal Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {portals.map((portal) => {
            const Icon = portal.icon;
            return (
              <Link
                key={portal.id}
                href={portal.href}
                className="group relative overflow-hidden rounded-2xl bg-slate-700/40 backdrop-blur-xl border border-slate-600/50 hover:border-slate-500 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10"
              >
                {/* Gradient overlay on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${portal.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                ></div>

                <div className="relative p-8">
                  {/* Icon */}
                  <div className={`${portal.iconBg} w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`${portal.textColor} w-8 h-8`} />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {portal.name}
                  </h3>
                  <p className="text-slate-300 mb-4">
                    {portal.description}
                  </p>

                  {/* Arrow indicator */}
                  <div className="flex items-center text-slate-300 group-hover:text-white transition-colors duration-300">
                    <span className="text-sm font-semibold">Sign in</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center text-slate-400 text-sm">
          <p>Need help? <a href="mailto:support@homeware.ae" className="text-blue-400 hover:text-blue-300">Contact support</a></p>
        </div>
      </div>
    </div>
  );
}
