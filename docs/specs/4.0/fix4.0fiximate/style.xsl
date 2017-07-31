<?xml version="1.0"?>

<xsl:stylesheet xmlns:xsl="http://www.w3.org/TR/WD-xsl" indent-result="yes">

	<xsl:template match="/">
		<HTML>
		<BODY>
				<TABLE border="0" cellspacing="0" cellpadding="8" STYLE="font-family:Arial; font-size:12pt; color:navy">
					<TR>
			
						<TD bgColor="#99ccff" align="center" valign="top"><B>TAG</B></TD>
						<TD bgColor="#cccccc" align="center" valign="top" width="20%"><B>Name</B></TD>
						<TD bgColor="#99ccff" align="center" valign="top"><B>Format</B></TD>
						<TD bgColor="#cccccc" align="center" valign="top" width="40%"><B>Description</B></TD>
						<TD bgColor="#99ccff" align="center" valign="top" width="20%"><B>Appears In</B></TD>
					</TR>
					<TR><TD COLSPAN="5" bgColor="#006699" height="1px"> </TD></TR>					

					<xsl:apply-templates select="//TAG" />
				</TABLE>
		</BODY>
		</HTML>
	</xsl:template>

	<xsl:template match="TAG">
		<TR>
			
			<TD bgColor="#99ccff" align="center" valign="top"><xsl:apply-templates select="./fieldID" /></TD>
			<TD bgColor="#cccccc" valign="top"><xsl:apply-templates select="./fieldName" /></TD>
			<TD bgColor="#99ccff" valign="top"><xsl:apply-templates select="./fieldFormat" /></TD>
			<TD bgColor="#cccccc" valign="top"><xsl:copy><xsl:apply-templates select="./desc"/></xsl:copy></TD>
			<TD bgColor="#99ccff" valign="top"><xsl:apply-templates select="./Message"/></TD>
		</TR>
		<TR><TD COLSPAN="5" bgColor="#006699" height="1px"> </TD></TR>
	</xsl:template>

	<xsl:template match="fieldID">
		<FONT face="Arial"><small><xsl:value-of /></small></FONT>
	</xsl:template>

	<xsl:template match="fieldName">
		<A>
			<xsl:attribute name="name"><xsl:apply-templates select=".//hiddenName" /></xsl:attribute>
			<xsl:value-of select="shownName"/>
		</A>
	</xsl:template>

	<xsl:template match="fieldFormat">
		<xsl:value-of />
	</xsl:template>

	<xsl:template match="desc">
		<xsl:copy>
			<xsl:value-of />
		</xsl:copy>
	</xsl:template>

	<xsl:template match="hiddenName"><xsl:value-of /></xsl:template>

	<xsl:template match="HiddenLink"><xsl:value-of />.xml</xsl:template>	
	<xsl:template match="ShownLink"><xsl:value-of /></xsl:template>	

	<xsl:template match="Message">
		<A>
			<xsl:attribute name="href"><xsl:apply-templates select=".//HiddenLink" /></xsl:attribute><xsl:attribute name="TARGET">lot</xsl:attribute>
			<xsl:value-of select="ShownLink"/>
		</A>
		<P />
	</xsl:template>

	<xsl:template match="BR">
		<BR />
	</xsl:template>

</xsl:stylesheet>

