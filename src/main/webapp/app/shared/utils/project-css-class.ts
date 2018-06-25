export class ProjectCssUtil {
  static setStatusClasses(status) {
    return {
      'badge': true,
      'badge-status-awaiting-review':
        status === 'PENDING_AVAILABILITY' || status === 'COMPLETED',
      'badge-status-review-declined': status === 'DECLINED_AVAILABILITY',
      'badge-status-review-completed':
        status === 'SCHEDULED' || status === 'PENDING_OFFER',
      'badge-blue': status === 'ACCEPTED',
      'badge-gray': status === 'DECLINED'
    };
  }
}