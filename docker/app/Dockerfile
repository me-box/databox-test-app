FROM registry.upintheclouds.org/databox_companion_app_base
RUN cd /root/databox-companion-app/client && git pull && npm run build
RUN cd /root/databox-companion-app/server && git pull
#EXPOSE 8001
#CMD ["/root/start.sh"]
